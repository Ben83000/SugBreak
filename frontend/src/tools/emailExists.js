export default async function emailExists(value, email, setEmail) {
  const isValid = /\S+@\S+\.\S+/.test(value);
  /*
      Si l'email est correct && 
      Si l'unicité de l'email n'a pas encore été vérifié ||
      a déja été vérifié mais que sa valeur a été modifiée depuis la dernière verif en db
      => Limite les fetchs inutiles
      */
  if (isValid && value !== email.value) {
    try {
      const response = await fetch(
        `http://localhost:5000/user/${encodeURIComponent(value)}` 
      );
      if (response.status === 200) {
        console.log(response.status)
        setEmail({ value: value, unique: false });
        return false;
      } else if (response.status === 404) {
        setEmail({ value: value, unique: true });
        return true;
      }
    } catch (error) {
      throw new Error("Erreur lors de la validation de l'email");
    }
  } else if (isValid && value === email.value) return email.unique;
}
