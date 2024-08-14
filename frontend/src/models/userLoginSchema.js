import { object, string } from "yup";


const userLoginSchema = object({
  email: string()
    .required("Ce champs est requis"),
  password: string()
    .required("Ce champs est requis")
});

export default userLoginSchema;