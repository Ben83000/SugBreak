import { object, string } from "yup";

const profileInfoSchema = object({
  firstname: string(),
  lastname: string(),
  email: string(),
  phone: string(),
});

export default profileInfoSchema;
