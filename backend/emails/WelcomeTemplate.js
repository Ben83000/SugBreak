const welcomeTemplate = ({ email, token }) => `
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
      <p>
        Bienvenue chez Sug Break ! Toute l'équipe vous accueillera du mardi au
        dimanche, de 15h à minuit 😄!
      </p>
      <p>
        N'oubliez pas de confirmer votre compte en cliquant sur le lien suivant:
      </p>
      <a href="http://localhost:5000/user/confirm/${token}">Confirmer votre compte</a>
      <p>
        Ce lien est valable 72h. Si le lien ne fonctionne plus, vous pouvez vous rendre sur 
        <a href="http://localhost:5173/registred">cette page</a>
         pour recevoir à nouveau un mail de confirmation.
      </p>
      <p>L'équipe Sug Break</p>
    </section>
  </body>
  </html>
`;

export default welcomeTemplate;