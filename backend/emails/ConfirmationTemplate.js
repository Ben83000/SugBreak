const ConfirmationTemplate = ({ email, token }) =>
  `
  <!DOCTYPE html>
  <html lang="fr">
  <body style="width: 80%; margin: auto;">
    <h1
      style="
        font-family:
          Cambria,
          Cochin,
          Georgia,
          Times,
          Times New Roman,
          serif;
        font-size: large;
      "
    >
      Bonjour ${email},
    </h1>
    <section>
      <p>Merci de confirmer votre compte en cliquant sur le lien ci-dessous :</p>
      <a href="https://gentle-citadel-85847-6ce2d6bf71ee.herokuapp.com/user/confirm/${token}">Confirmer votre compte</a>
      <p>Si vous n'avez pas demandé cette confirmation, ignorez ce message.</p>
      <p>Cordialement,</p>
      <p>L'équipe Sug Break</p>
    </section>
  </body>
  </html>
`;
export default ConfirmationTemplate;
