import cn from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/common/Input";
import { Button } from "@/components/ui/button";
import menuData from "@/tools/menu.json";
import addProductSchema from "@/models/addProductSchema";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import storage from "@/firebase/config";
import { useContext, useRef, useState } from "react";
import Loader from "../../../common/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { ProductContext } from "@/contexts/productContext";

function AddProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductSchema),
    mode: "onTouched",
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef();
  const { addProduct } = useContext(ProductContext);

  const onSubmit = async (data) => {
    const dataUpdated = { ...data, price: parseFloat(data.price) };
    const response = await addProduct(dataUpdated);
    if (response.ok) {
      setImage(null);
      setImageUrl("");
      reset();
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setImage(file);
      setValue("image", file, { shouldValidate: true });
      setValue("imageName", file.name);
      const imageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadUrl = await getDownloadURL(imageRef);
      setValue("imageUrl", downloadUrl);
      setImageUrl(downloadUrl);
      setLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (imageUrl) {
      const imageRef = ref(storage, `images/${image.name}`);
      await deleteObject(imageRef);
      reset({ image: undefined, imageUrl: undefined, imageName: undefined });
      setImage(null);
      setImageUrl("");
    }
  };

  const handleClick = () => {
    inputFileRef.current.click();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-sm:hidden grid grid-cols-4 grid-rows-4 max-w-[36rem] min-w-[36rem] p-4 max-h-full gap-2 select-none"
    >
      <div className="row-span-3 aspect-square rounded-lg overflow-hidden min-h-full max-h-full">
        {imageUrl ? (
          <div className="relative min-h-full">
            <img
              src={imageUrl}
              alt="image uploaded"
              className="w-full h-full object-cover rounded-lg"
            />
            <FontAwesomeIcon
              onClick={handleDeleteImage}
              icon={faX}
              size="sm"
              className="absolute cursor-pointer top-1 right-1 bg-red-600/80 hover:bg-red-600 text-white rounded-lg p-1.5"
            />
          </div>
        ) : loading ? (
          <Loader classname="mx-auto h-full w-full p-4" />
        ) : (
          <div
            className="min-h-full flex flex-col bg-pink-400/70 hover:bg-pink-400 p-1 cursor-pointer justify-center"
            onClick={handleClick}
          >
            <input
              onChange={handleImage}
              ref={inputFileRef}
              type="file"
              className="hidden text-slate-900 p-1 rounded-lg focus:ring-pink-600 focus:ring-2 focus:outline-none"
            />
            <p className="text-wrap text-4xl text-white leading-none text-center">
              Ajouter une image
            </p>
            <p className="text-wrap text-xl text-white leading-none text-center">
              Dimension 1:1 recommandée
            </p>
          </div>
        )}
      </div>

      <Input
        placeholder={"Nom du Produit"}
        {...register("name")}
        id="name"
        error={errors.name?.message}
      />
      <Input
        placeholder={"Prix"}
        {...register("price")}
        id="price"
        error={errors.price?.message}
      />
      <select
        name=""
        {...register("category")}
        className={cn(
          "text-slate-900 p-1 rounded-lg shadow-inner shadow-slate-400 focus:ring-pink-600 focus:ring-2 focus:outline-none",
          errors.category?.message && "ring-2 ring-red-500"
        )}
      >
        <option value="default" hidden>
          Catégorie
        </option>
        {menuData.map((item, index) => {
          return (
            <option key={index} value={item.category}>
              {item.name}
            </option>
          );
        })}
      </select>

      <textarea
        className={cn(
          "text-slate-800 row-span-2 col-span-3 p-1 rounded-lg shadow-inner shadow-slate-400 focus:outline-pink-500 min-h-full text-start overflow-auto",
          errors.description?.message && "ring-2 ring-red-500"
        )}
        placeholder="Description"
        rows={4}
        type="text"
        id="description"
        {...register("description")}
      />
      <p className="text-wrap text-xl text-slate-900 leading-none text-center">
        Formats acceptés: .jpg/.jpeg/.png
      </p>
      <Button
        className="col-start-2 col-span-2 min-h-full
            "
      >
        Ajouter un produit
      </Button>
      <select
        {...register("stock")}
        name="stock"
        id="stock"
        className={cn(
          "text-slate-900 p-1 rounded-lg shadow-inner shadow-slate-400 focus:ring-pink-600 focus:ring-2 focus:outline-none",
          errors.stock?.message && "ring-2 ring-red-500"
        )}
      >
        <option value={true}>En stock</option>
        <option value={false}>En rupture</option>
      </select>
    </form>
  );
}

export default AddProductForm;
