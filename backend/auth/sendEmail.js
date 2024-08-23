import { Resend } from "resend";
import WelcomeTemplate from "../emails/WelcomeTemplate.js";
import ConfirmationTemplate from "../emails/ConfirmationTemplate.js";
import ConfirmationOrderTemplate from "../emails/ConfirmationOrderTemplate.js";

const resend = new Resend(process.env.RESEND_API_KEY);

// Fonction générique d'envoi d'email
const sendEmail = async (email, template, subject, ...templateData) => {
  const mailOptions = {
    from: "onboarding@resend.dev",
    to: email,
    subject: subject,
    html: template(...templateData),
  };

  try {
    await resend.emails.send(mailOptions);
  } catch (error) {
    throw new Error("Erreur lors de l'envoi de l'email");
  }
};

// Mail de confirmation
const sendConfirmationEmail = async (email, token) => {
  await sendEmail(email, ConfirmationTemplate, "Confirmation d'inscription", {
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

// Mail de confirmation de commande
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
