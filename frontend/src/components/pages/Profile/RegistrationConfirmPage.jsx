import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '@/contexts/authContext';
import Card from '@/components/common/Card';

function RegistrationConfirmPage() {
  const { user, sendEmailConfirmation } = useContext(AuthContext);

  return (
    <Card>
      {user ? (
        <div className="gap-2 flex flex-col">
          <h1 className="text-2xl text-center text-pink-200">Votre compte a été créé avec succés !</h1>
          <p>Il ne vous reste plus qu&apos;une dernière étape avant de pouvoir vous régaler...</p>
          <p>
            Veuillez <span className="font-semibold">activer votre compte</span> en cliquant sur le lien contenu dans le
            mail de confirmation qui vient de vous être envoyé à l&apos;adresse {user?.email}.
          </p>
          <p>
            Vous n&apos;avez rien reçu ?{' '}
            <span
              onClick={() => sendEmailConfirmation(user?.email)}
              className="underline cursor-pointer hover:text-pink-300">
              Cliquez ici
            </span>{' '}
            pour recevoir à nouveau un mail de confirmation. Pensez également à vérifier vos spams.
          </p>
          <Link to="/online-ordering" className="underline text-pink-200 hover:text-pink-300 w-fit text-xl">
            Retour au Menu
          </Link>
        </div>
      ) : (
        <Link className="underline text-2xl font-rancho text-center" to="/">
          Retour à l&apos;accueil
        </Link>
      )}
    </Card>
  );
}

export default RegistrationConfirmPage;
