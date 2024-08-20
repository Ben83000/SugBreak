import { useContext, useEffect } from "react";
import Input from "@/components/common/Input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import profileInfoSchema from "@/models/profileInfoSchema";
import AuthContext from "@/contexts/authContext";
import BackButton from "@/components/layouts/BackButton";

function ProfilePage() {
  const { user, updateUser, handleUser } = useContext(AuthContext);

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileInfoSchema),
    mode: "onTouched",
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      phone: user?.phone,
    },
  });

  useEffect(() => {
    reset(user); // Quand on modifie les infos, le user change et on reset les valeurs des input
  }, [user]);

  const onSubmit = async (data) => {
    updateUser(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // on extrait name et value
    handleUser(name, value); // on envoie la valeur au user pour l'affichage a l'ecran
    setValue(name, value); // on recup la valeur dans data pour l'envoi de données (et la validation)
  };

  return (
    <section className="text-slate-100 pt-8 flex w-full flex-col gap-8 items-center bg-black flex-grow p-4 relative select-none">
      <BackButton className="absolute top-0 left-2 text-xl" />
      <h1 className="text-4xl">Votre profil</h1>
      <form
        className="bg-pink-950/85 flex flex-col w-full sm:w-1/2 sm:min-w-[576px] mx-8 gap-6 p-8 rounded-xl shadow-inner shadow-pink-500"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl">Vos informations</h2>
        <div className="grid md:grid-cols-2 gap-2">
          <Input
            id="firstname"
            label="Prénom"
            type="text"
            placeholder="Entrez votre prénom"
            value={user?.firstname || ""}
            onChange={handleChange}
            error={errors.firstname?.message}
          />
          <Input
            id="lastname"
            label="Nom"
            type="text"
            placeholder="Entrez votre nom"
            value={user?.lastname || ""}
            onChange={handleChange}
            error={errors.lastname?.message}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Entrez votre email"
            readOnly={true}
            value={user?.email || ""}
            onChange={handleChange}
            error={errors.email?.message}
          />
          <Input
            id="phone"
            label="Téléphone Mobile"
            type="tel"
            placeholder="Entrez votre numéro de mobile"
            value={user?.phone || ""}
            onChange={handleChange}
            error={errors.phone?.message}
          />
        </div>
        <Button className="w-full text-xl self-center">
          Sauvegarder
        </Button>
      </form>
    </section>
  );
}

export default ProfilePage;
