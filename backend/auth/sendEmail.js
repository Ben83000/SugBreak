import { Resend } from "resend";
import WelcomeTemplate from "../emails/WelcomeTemplate.js";
import ConfirmationTemplate from "../emails/ConfirmationTemplate.js";
import ConfirmationOrderTemplate from "../emails/ConfirmationOrderTemplate.js";

const resend = new Resend(process.env.RESEND_API_KEY);

// Fonction générique d'envoi d'email
const sendEmail = async (email, template, subject, ...templateData) => {
  const mailOptions = {
    from: "benjaminboufflers1@gmail.com",
    to: email,
    subject: subject,
    html: template(...templateData),
  };

  try {
    console.log("envoi de l'email")
    console.log(mailOptions)
    await resend.emails.send(mailOptions);
    console.log("email envoyé")
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw new Error("Erreur lors de l'envoi de l'email");
  }
};

// Mail de confirmation
const sendConfirmationEmail = async (email, token) => {
  await sendEmail("benjaminboufflers11@gmail.com", ConfirmationTemplate, "Confirmation d'inscription", {
    email,
    token,
  });
};

// Mail de bienvenue
const sendWelcomeEmail = async (email, token) => {
  await sendEmail(email, WelcomeTemplate, "Bienvenue chez Sug Break", {
    email,
    token,
  });
};

const sendConfirmationOrderEmail = async (content, owner, id) => {
  const lowerCaseEmail = owner.email.toLowerCase();
  await sendEmail(
    lowerCaseEmail,
    ConfirmationOrderTemplate,
    `Commande n°${id} confirmée`,
    { content, owner, id }
  );
};

export { sendConfirmationEmail, sendWelcomeEmail, sendConfirmationOrderEmail };
