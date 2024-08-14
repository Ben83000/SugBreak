import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/common/Input';
import { Button } from '@/components/ui/button';
import menuData from '@/tools/menu.json';
import addProductSchema from '@/models/addProductSchema';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import storage from '@/firebase/config';
import { useContext, useRef, useState } from 'react';
import Loader from '../../../common/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ProductContext } from '@/contexts/productContext';

function AddProductFormMobile() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductSchema),
    mode: 'onTouched',
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef();
  const { addProduct } = useContext(ProductContext);

  const onSubmit = async (data) => {
    const dataUpdated = { ...data, price: parseFloat(data.price) };
    const response = await addProduct(dataUpdated);
    if (response.ok) {
      setImage(null);
      setImageUrl('');
      reset();
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setImage(file);
      setValue('image', file, { shouldValidate: true });
      setValue('imageName', file.name);
      const imageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadUrl = await getDownloadURL(imageRef);
      setValue('imageUrl', downloadUrl);
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
      setImageUrl('');
    }
  };

  const handleClick = () => {
    inputFileRef.current.click();
  };

  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-sm:hidden flex flex-col w-full h-full p-4 max-h-full gap-2 select-none">
      <div className=" flex gap-2">
        {imageUrl ? (
          <div className="relative aspect-square w-1/2">
            <img src={imageUrl} alt="image uploaded" className="rounded-lg object-contain" />
            <FontAwesomeIcon
              onClick={handleDeleteImage}
              icon={faX}
              size="sm"
              className="absolute cursor-pointer top-1 right-1 bg-red-600/80 hover:bg-red-600 text-white rounded-lg p-1.5"
            />
          </div>
        ) : loading ? (
          <Loader classname="mx-auto h-full w-1/2 p-4" />
        ) : (
          <div
            className="aspect-square w-1/2 flex flex-col bg-pink-400/70 rounded-lg hover:bg-pink-400 p-1 cursor-pointer justify-center"
            onClick={handleClick}>
            <input
              onChange={handleImage}
              ref={inputFileRef}
              type="file"
              className="hidden text-slate-900 p-1 rounded-lg focus:ring-pink-600 focus:ring-2 focus:outline-none"
            />
            <p className="text-wrap text-4xl text-white leading-none text-center">Ajouter une image</p>
            <p className="text-wrap text-xl text-white leading-none text-center">Dimension 1:1 recommandée (.jpg/.jpeg/.png)</p>
          </div>
        )}
        <div className="grid grid-rows-4 gap-2 w-1/2">
          <Input
            className="h-full"
            placeholder={'Nom du Produit'}
            {...register('name')}
            id="name"

          />
          <Input
            className="h-full"
            placeholder={'Prix'}
            {...register('price')}
            id="price"

          />
          <select
            {...register('category')}
            className={cn(
              'text-slate-900 p-1 rounded-lg shadow-inner shadow-slate-400 focus:ring-pink-600 focus:ring-2 focus:outline-none',
              errors.category?.message && 'ring-2 ring-red-500'
            )}>
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
            )}>
            <option value={true}>En stock</option>
            <option value={false}>En rupture</option>
          </select>
        </div>
      </div>
      

      <textarea
        className={cn(
          'text-slate-800 flex-grow p-1 rounded-lg shadow-inner shadow-slate-400 focus:outline-pink-500 text-start overflow-auto',
          errors.description?.message && 'ring-2 ring-red-500'
        )}
        placeholder="Description"
        rows={4}
        type="text"
        id="description"
        {...register('description')}
      />

      <Button
        className=" mt-auto">
        Ajouter un produit
      </Button>
    </form>
  );
}

export default AddProductFormMobile;
