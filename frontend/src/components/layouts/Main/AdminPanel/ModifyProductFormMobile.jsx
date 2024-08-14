import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/common/Input';
import { Button } from '@/components/ui/button';
import menuData from '@/tools/menu.json';
import modifyProductSchema from '@/models/modifyProductSchema';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import storage from '@/firebase/config';
import { useContext, useRef, useState } from 'react';
import Loader from '@/components/common/Loader';
import { ProductContext } from '@/contexts/productContext';
import { ConfirmationContext } from '@/contexts/confirmationContext';
import { ModalContext } from '@/contexts/modalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function ModifyProductFormMobile() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(modifyProductSchema),
    mode: 'onTouched',
  });

  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef();
  const { updateProdut, deleteProduct, productToModify, updateProductToModify, handleProductToModify } =
    useContext(ProductContext);
  const [image, setImage] = useState(null);
  const { openConfirmationDialog } = useContext(ConfirmationContext);
  const { closeModal } = useContext(ModalContext);

  const onSubmit = async (data) => {
    let dataUpdated;
    // Si l'image a été modifié
    if (image) {
      const imageRefNew = ref(storage, `images/${productToModify.imageName}`); // Chemin définitif de l'image
      await uploadBytes(imageRefNew, image); // On retélécharge l'image mais vers son chemin définitif
      const downloadUrl = await getDownloadURL(imageRefNew); // Url def de l'image
      updateProductToModify('imageUrl', downloadUrl); // On recup l'url def de l'image
      dataUpdated = {
        ...data,
        price: parseFloat(data.price), // On convertit l'input price explicitement pour éviter un éventuel bug
        imageUrl: downloadUrl, // On envoie l'url definitif (c'est l'url temporaire qui est recup dans data au moment du submit)
        imageName: productToModify.imageName, // nom de la nouvelle image (pour supp firebase)
      };
    } else {
      dataUpdated = {
        ...data,
        price: parseFloat(data.price),
      };
    }
    updateProdut(productToModify._id, dataUpdated); // On modifie le produit en BD avec les nouvelles données
    setImage(null); // On reset tout
    reset();
    handleProductToModify(null);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true); // On lance le loader pendant le changement d'image
      if (productToModify?.imageName) {
        const imageRef = ref(storage, `images/${productToModify?.imageName}`);
        await deleteObject(imageRef);
      }
      setImage(file); // On recupère le file
      setValue('image', file, { shouldValidate: true }); // Juste pour valider l'img selon critères de taille/format
      const temporaryImageRef = ref(storage, `images/temporary.jpg`); // Chemin temporaire de l'img pour l'afficher
      await uploadBytes(temporaryImageRef, file); // upload image vers son emplacement temporaire
      const downloadUrl = await getDownloadURL(temporaryImageRef); // On stocke l'img temporairement sur firebase pour l'afficher
      updateProductToModify('imageName', file.name); // On recupere le fichier pour pouvoir le telecharger au submit
      updateProductToModify('imageUrl', downloadUrl); // On recupère l'url temporaire pour afficher l'image
      setLoading(false);
    }
  };

  const handleClick = () => {
    inputFileRef.current.click();
  };

  const handleDelete = async () => {
    const imageRef = productToModify?.imageName
      ? ref(storage, `images/${productToModify?.imageName}`) // On stocke la ref de l'image du produit pour pouvoir la supprimer
      : null; // Null si l'image n'avait pas d'image rattachée
    const response = await deleteProduct(productToModify?._id); // Suppression du produit en DB
    // Si le produit a bien pu être supprimée de la base de donnée..
    if (response.ok) {
      // Si le produit avait une image rattachée (non null)
      if (imageRef) {
        await deleteObject(imageRef); // Suppression de l'image du produit dans firebase
      }
      handleProductToModify(null); // On reset tout
      setImage(null);
      reset();
    }
    closeModal();
  };

  const handleDeleteImage = async (e) => {
    e.stopPropagation();
    if (productToModify.imageName) {
      const imageRef = ref(storage, `images/${productToModify?.imageName}`);
      if (imageRef) {
        // await deleteObject(imageRef);
        updateProductToModify('imageName', null);
        updateProductToModify('imageUrl', null);
        reset({ imageName: null, imageUrl: null });
        const updatedData = {
          ...productToModify,
          imageName: null,
          imageUrl: null,
        };
        await updateProdut(productToModify?._id, updatedData);
      }
    }
  };

  const handleDeleteButton = (e) => {
    openConfirmationDialog(
      e,
      'delete',
      `Voulez-vous vraiment supprimer le produit ${productToModify?.name} ?`,
      handleDelete,
      closeModal
    );
  };

  return productToModify !== null ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-sm:hidden flex flex-col w-full h-full p-4 max-h-full gap-2 select-none">
      <div className="flex gap-2">
        <div className="aspect-square w-1/2 rounded-lg overflow-hidden">
          {loading ? (
            <Loader classname="mx-auto h-full w-full p-4" />
          ) : (
            <div
              className="flex flex-col bg-pink-400/70 hover:bg-pink-400 cursor-pointer justify-center relative"
              onClick={handleClick}>
              <input
                onChange={handleImage}
                ref={inputFileRef}
                type="file"
                className="hidden text-slate-900 p-1 rounded-lg focus:ring-pink-600 focus:ring-2 focus:outline-none"
              />
              <img
                src={productToModify?.imageUrl ?? `images/default/${productToModify?.category}.jpg`}
                alt="image uploaded"
                className="w-full h-full object-cover rounded-lg"
              />
              <FontAwesomeIcon
                onClick={handleDeleteImage}
                icon={faX}
                size="sm"
                className="absolute cursor-pointer top-1 right-1 bg-red-600/80 hover:bg-red-600 text-white rounded-lg p-1.5"
              />
              <p className="text-wrap text-xl text-white bg-pink-500/80 p-1 rounded-lg leading-none text-center absolute w-4/5 left-1/2 -translate-x-1/2">
                Cliquez pour modifier l&apos;image
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-rows-4 gap-2 w-1/2">
          <Input
            className="h-full"
            placeholder={'Nom du Produit'}
            {...register('name')}
            id="name"
            value={productToModify?.name}
            onChange={(e) => updateProductToModify('name', e.target.value)}
          />
          <Input
            className="h-full"
            placeholder={'Prix'}
            {...register('price')}
            id="price"
            value={productToModify?.price.toString()}
            onChange={(e) => updateProductToModify('price', e.target.value)}
          />
          <select
            name="category"
            {...register('category')}
            className={cn(
              'text-slate-900 p-1 rounded-lg shadow-inner shadow-slate-400 focus:ring-pink-600 focus:ring-2 focus:outline-none',
              errors.category?.message && 'ring-2 ring-red-500'
            )}
            value={productToModify?.category}
            onChange={(e) => updateProductToModify('category', e.target.value)}>
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
          <select
            {...register('stock')}
            name="stock"
            id="stock"
            className={cn(
              'text-slate-900 p-1 rounded-lg shadow-inner shadow-slate-400 focus:ring-pink-600 focus:ring-2 focus:outline-none',
              errors.stock?.message && 'ring-2 ring-red-500'
            )}
            value={productToModify.stock}
            onChange={(e) => updateProductToModify({ stock: e.target.value })}>
            <option value={true}>En stock</option>
            <option value={false}>En rupture</option>
          </select>
        </div>
      </div>
      <textarea
        className={cn(
          'text-slate-800 flex-grow p-1 rounded-lg shadow-inner shadow-slate-400 focus:outline-pink-500  text-start overflow-auto',
          errors.description?.message && 'ring-2 ring-red-500'
        )}
        placeholder="Description"
        rows={4}
        type="text"
        id="description"
        {...register('description')}
        value={productToModify.description}
        onChange={(e) => updateProductToModify('description', e.target.value)}
      />

      <div className="flex w-full gap-1 mt-auto">
        <Button type="submit" className="w-1/2">
          Enregistrer les modif
        </Button>
        <Button type="button" onClick={handleDeleteButton} className=" bg-red-600 hover;bg-red-700 w-1/2">
          Supprimer ce produit
        </Button>
      </div>
    </form>
  ) : (
    <h2 className="sm:hidden text-3xl ml-2 mt-2">Veuillez cliquer sur un produit pour le modifier/supprimer.</h2>
  );
}

export default ModifyProductFormMobile;
