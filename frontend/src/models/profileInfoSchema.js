import { object, string } from "yup";

// const PHONE_REGEX = /^(\+33|0)([1-9])(\d{2}){4}$/;

const profileInfoSchema = object({
  firstname: string(),
  lastname: string(),
  email: string(),
  phone: string(),
});

export default profileInfoSchema;
