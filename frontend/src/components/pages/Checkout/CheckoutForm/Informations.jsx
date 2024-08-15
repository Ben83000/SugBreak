import Input from '@/components/common/Input';
import AuthContext from '@/contexts/authContext';
import checkoutInformationSchema from '@/models/checkoutInformationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function Delivery({ handleStep, setCheckoutData, checkoutData }) {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const {
    handleSubmit,
    trigger,
    setValue,
    getValues,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(checkoutInformationSchema),
  });

  console.log({ checkoutData });

  useEffect(() => {
    user && setUserData(user);
    reset({
      email: checkoutData?.email || userData?.email || '',
      phone: checkoutData?.phone || userData?.phone || '',
      firstname: checkoutData?.firstname || userData?.firstname || '',
      lastname: checkoutData?.lastname || userData?.lastname || '',
      address: checkoutData?.address || userData?.address || '',
      city: checkoutData?.city || userData?.city || '',
      zip: checkoutData?.zip || userData?.zip || '',
      informations: checkoutData?.informations || userData?.informations || '',
    });
  }, [userData]);

  const onSubmit = (data) => {
    console.log(data);
    setCheckoutData(data);
    handleStep();
  };

  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 md:p-8 grid grid-cols-6 gap-2 max-sm:grid-cols-2 max-xs:grid-cols-1 overflow-y-auto">
      <Input
        placeholder="Adresse email"
        type="email"
        id="email"
        className="sm:col-span-3"
        {...register('email')}
        error={errors?.email?.message}
      />
      <Input
        placeholder="Numéro de portable"
        type="tel"
        id="phone"
        className="sm:col-span-3"
        {...register('phone')}
        error={errors?.phone?.message}
      />
      <Input
        id="firstname"
        {...register('firstname')}
        placeholder="Prénom"
        className="sm:col-span-3"
        error={errors?.firstname?.message}
      />
      <Input
        id="lastname"
        {...register('lastname')}
        placeholder="Nom"
        className="sm:col-span-3"
        error={errors?.lastname?.message}
      />
      <Input
        id="address"
        {...register('address')}
        placeholder="Adresse complète (ex: 26 rue des Oliviers)"
        className="sm:col-span-3"
        error={errors?.address?.message}
      />
      <Input
        id="city"
        {...register('city')}
        placeholder="Ville (ex: Drancy)"
        className="sm:col-span-2"
        error={errors?.city?.message}
      />
      <Input id="zip" {...register('zip')} placeholder="Code postal" error={errors?.zip?.message} />
      <Input
        id="informations"
        {...register('informations')}
        placeholder="Informations complémentaires (ex: Bat a, escalier 2, digicode..)"
        className="sm:col-span-6"
        error={errors?.informations?.message}
      />
      <button
        type="submit"
        className=" bg-slate-900 text-white text-xl p-2 border-none rounded-xl font-semibold xs:col-span-2 sm:col-span-4 sm:col-start-2">
        Continuer
      </button>
    </form>
  );
}

export default Delivery;
