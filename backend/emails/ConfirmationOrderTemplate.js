const ConfirmationOrderTemplate = ({content, owner, id}) =>
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
      Bonjour ${owner.email},
    </h1>
    <section>
      <p>Votre commande numéro ${id} est confirmée.</p>
      <p>Elle sera prête d'ici 15 à 20 minutes. Vous recevrez également un mail pour vous notifier quand votre commande sera prête.</p>
      <p>Cordialement,</p>
      <p>L'équipe Sug Break</p>
    </section>
  </body>
  </html>
`;
export default ConfirmationOrderTemplate;
