import { object, string, ref } from "yup";
import emailExists from "@/tools/emailExists";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

const userSchema = (email, setEmail) => object({
  email: string()
    .required("Ce champs est requis.")
    .matches(EMAIL_REGEX, "L'email n'est pas valide.")
    .test('unique-email', 'Email déjà utilisé.', async (value) => await emailExists(value, email, setEmail)
    ),
  password: string()
    .required("Ce champs est requis.")
    .min(
      6,
      "Le mot de passe doit contenir au moins 6 caractères dont une minuscule, une majuscule & un chiffre."
    )
    .matches(
      PWD_REGEX,
      "Le mot de passe doit comporter au moins une minuscule, une majuscule & un chiffre."
    ),
  passwordConfirm: string()
    .required("Ce champs est requis.")
    .oneOf([ref("password")], "Les mots de passe ne sont pas identiques."),
});

export default userSchema;