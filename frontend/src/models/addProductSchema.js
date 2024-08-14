import { boolean, number, object, string, mixed } from "yup";
import menuData from "@/tools/menu.json";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const FILE_SIZE = 5 * 1024 * 1024; // 5MB

const addProductSchema = object({
  name: string().required("Ce champs est requis"),
  price: number().required("Ce champs est requis"),
  category: string()
    .oneOf(
      menuData.map((item) => item.category),
      "Sélectionnez une catégorie valide"
    )
    .required("Ce champs est requis"),
  description: string().required("Ce champs est requis"),
  stock: boolean().required("Ce champs est requis"),
  image: mixed()
    .test("fileSize", "Le fichier est trop volumineux", (value) => {
      if (value) return value.size < FILE_SIZE
      else return true;
    })
    .test("fileFormat", "Le format du fichier n'est pas supporté", (value) => {
      if (value) return SUPPORTED_FORMATS.includes(value.type)
      else return true;
    }),
    imageUrl: string(),
    imageName: string(),
});

export default addProductSchema;
