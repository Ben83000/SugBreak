import { object, string } from "yup";

const PHONE_REGEX = /^(?:(?:\+|00)33|0)[1-9](?:[\s.-]?\d{2}){4}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

const checkoutInformationSchema = object({
  email: string()
    .required("Ce champs est requis.")
    .matches(EMAIL_REGEX, "L'email n'est pas valide."),
  phone: string()
    .required("Ce champs est requis.")
    .matches(
      PHONE_REGEX,
      "Format incorrect."
    ),
  lastname: string().required("Ce champs est requis."),
  firstname: string().required("Ce champs est requis."),
  address: string().required("Ce champs est requis."),
  city: string().required("Ce champs est requis."),
  zip: string().required("Ce champs est requis."),
  informations: string(),
});

export default checkoutInformationSchema;
