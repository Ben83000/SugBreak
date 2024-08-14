import express from 'express';
import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isAuthentificated } from '../auth/auth.js';
import { sendConfirmationEmail, sendWelcomeEmail } from '../auth/sendEmail.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const secretKey = process.env.JWT_SECRET;

// Création d'un nouvel utilisateur avec email + mdp
router.post('/', async (req, res) => {
  const lowerCaseEmail = req.body.email.toLowerCase();
  const confirmationToken = jwt.sign({ email: lowerCaseEmail }, secretKey, {
    expiresIn: '72h',
  });
  const token = jwt.sign({ email: lowerCaseEmail }, secretKey, {
    expiresIn: '72h',
  });
  // Si  le compte a été créé 'manuellement' (non google)
  if (req.body.password) {
    const hash = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)); // mot de passe crypté par bcrypt
    const userToCreate = {
      email: lowerCaseEmail,
      password: hash,
      confirmationToken: confirmationToken,
      isActive: false,
      isAdmin: false,
    };
    const userCreated = await userModel.create(userToCreate); // création de l'utilisateur en bdd
    if (userCreated) {
      await sendWelcomeEmail(lowerCaseEmail, confirmationToken); // envoi du mail de bienvenue/confirmation de compte
      // cookie juste pour garder en mémoire l'utilisateur sans etre authentifié, pour renvoyer mail de confirmation plus facilement en cas de besoin
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      const userWithoutPassword = {
        ...userCreated.toObject(),
        password: undefined,
      };
      res.status(200).json(userWithoutPassword);
    } else if (!userCreated) {
      res.status(404).json({
        message: 'Erreur lors de la création du compte, veuillez réessayer.',
      });
    }
  } else {
    // Si le compte a été crée via google
    const userToCreateWithGoogle = {
      ...req.body,
      email: lowerCaseEmail,
      isActive: true,
    };
    const userCreatedWithGoogle = await userModel.create(userToCreateWithGoogle);
    if (userCreatedWithGoogle) {
      res.status(200).json(userCreatedWithGoogle);
    } else if (!userCreatedWithGoogle) {
      res.status(404).json({
        message: 'Erreur lors de la création de votre compte, veuillez réessayer.',
      });
    }
  }
});

// Route d'authentification (useeffect du authcontext), verifie avec le middleware isAuth si token valide, et si oui next() pour appeler la fonction et renvoyer le user
router.get('/profile', isAuthentificated, (req, res) => {
  res.status(200).json(req.user);
});

// Route de confirmation de compte
router.get('/confirm/:token', async (req, res) => {
  const token = req.params.token; // extrait le token de la requette http
  if (!token) {
    res
      .status(302)
      .redirect('http://localhost:5173/registered?status=error&message=Votre compte n&apos;a pas pu être activé...');
  }
  let decoded;
  try {
    decoded = jwt.verify(token, secretKey);
  } catch (error) {
    res
      .status(302)
      .redirect('http://localhost:5173/registered?status=error&message=Votre compte n&apos;a pas pu être activé...');
  }

  const user = await userModel.findOne({ email: decoded.email }); // on recup le compte grace au mail recup dans le token dechiffré
  // si un utilisateur est bien trouvé
  if (user) {
    // s'il n'est pas encore actif
    if (!user.isActive) {
      await userModel.updateOne({ email: decoded.email }, { isActive: true }); // on le passe 'actif'
      res
        .status(302)
        .redirect('http://localhost:5173/registered?status=success&message=Votre compte est maintenant actif !');
    } else {
      res
        .status(302)
        .redirect('http://localhost:5173/registered?status=already&message=Votre compte a déjà été activé !');
    }
  } 
  // si aucun user n'a été trouvé
  else {
    res
      .status(302)
      .redirect('http://localhost:5173/registered?status=error&message=Votre compte n&apos;a pas pu être activé...');
  }
});

// Vérifie si un user existe déja et le renvoie le cas échéant
router.get('/:email', async (req, res) => {
  const decodedEmail = decodeURIComponent(req.params.email);
  const user = await userModel.findOne({ email: decodedEmail.toLowerCase() });
  if (user) {
    const userWithoutPassword = { ...user.toObject(), password: undefined };
    res.status(200).json(userWithoutPassword);
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

router.patch('/:email', async (req, res) => {
  try {
    const decodedEmail = decodeURIComponent(req.params.email);
    const userDatas = req.body;
    const userUpdated = await userModel.findOneAndUpdate({ email: decodedEmail.toLowerCase() }, userDatas, {
      new: true,
    });
    const userWithoutPassword = {
      ...userUpdated.toObject(),
      password: undefined,
    };
    if (userUpdated) {
      res.status(200).json({
        message: 'Mise à jour effectuée avec succés.',
        user: userWithoutPassword,
      });
    } else {
      res.status(404).json({ message: 'Impossible de mettre à jour les infos.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur de connexion au serveur.' });
  }
});

// Route de déconnexion
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ message: 'Déconnexion réussie.' });
});

// Route de connexion via google
router.post('/loginWithGoogle', async (req, res) => {
  try {
    const emailSubmitted = req.body.email;
    const user = await userModel.findOne({ email: emailSubmitted.toLowerCase() });
    if (user) {
      const userWithoutPassword = { ...user.toObject(), password: undefined }; // On renvoie le user sans le password
      // On genere un cookie pour garder l'utilisateur connecté pendant 72h
      const token = jwt.sign({ email: user.email }, secretKey, {
        expiresIn: '72h',
      });
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(200).send(userWithoutPassword);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/emailConfirmation', async (req, res) => {
  const email = req.body.email.toLowerCase();
  const user = await userModel.findOne({ email: email });
  if (user) {
    const confirmationToken = jwt.sign({ email: email }, secretKey, {
      expiresIn: '72h',
    });
    await sendConfirmationEmail(email, confirmationToken);
    res.status(200).json({
      message: `Un email vient d'être envoyé à ${email}. Vous devriez le recevoir d'ici quelques minutes. S'il n'apparaît pas, veuillez vérifier vos spams.`,
    });
  } else {
    res.status(401).json({
      message: `Nous n'avons trouvé aucun compte utilisateur associé à l'adresse ${email}`,
      typeError: 'emailNotFound',
    });
  }
});

router.post('/login', async (req, res) => {
  const emailSubmitted = req.body.email;
  const passwordSubmitted = req.body.password;
  const errorAuthMsg = 'Adresse e-mail ou mot de passe incorrect.';
  const user = await userModel.findOne({ email: emailSubmitted.toLowerCase() });
  if (user) {
    const passwordMatch = await bcrypt.compare(passwordSubmitted, user.password); // on compare les mots de passe (cryptés par bcrypt)
    // si les mots de passe sont bien identiques
    if (passwordMatch) {
      const userWithoutPassword = { ...user.toObject(), password: undefined }; // mot de passe undefined
      // token d'authentification 72h
      const token = jwt.sign({ email: user.email }, secretKey, {
        expiresIn: '72h',
      });
      // on le stocke dans les cookies pdt 72h
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      // Si le compte n'est pas encore activé
      if (!user.isActive) {
        return res.status(401).json({
          message: 'Veuillez confirmer votre email pour vous connecter.',
          typeError: 'emailConfirmation',
          user: userWithoutPassword,
        });
      } else {
        return res.status(200).json({
          message: 'Connexion réussie.',
          user: userWithoutPassword,
        });
      }
    }
    // Sinon si les mots de passe ne sont pas identiques, on renvoie une erreur d'identification
    else {
      return res.status(401).json({ typeError: 'id', message: errorAuthMsg });
    }
  }
  // Si l'identifiant n'existe pas, on renvoie la meme erreur d'identification
  else {
    return res.status(401).json({ typeError: 'id', message: errorAuthMsg });
  }
});

export default router;
