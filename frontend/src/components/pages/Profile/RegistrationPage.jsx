import Input from "@/components/common/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import userSchema from "@/models/userSchema";
import { Button } from "@/components/ui/button";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import AuthContext from "@/contexts/authContext";
import emailExisting from "@/tools/emailExisting";
import Card from "@/components/common/Card";

function RegistrationPage() {
  const { loginWithGoogle, createUserWithGoogle, createUser } =
    useContext(AuthContext);

  const [email, setEmail] = useState({ value: "", unique: false });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, isDirty, isValid, errors },
  } = useForm({
    resolver: yupResolver(userSchema(email, setEmail)),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data) => {
    await createUser(data);
  };

  return (
    <>
      <Card>
        <div className="mx-auto text-white text-center leading-tight">
          <h1 className="font-semibold text-lg text-pink-200">Inscription</h1>
          <p>Vous avez déja un compte ?</p>
          <Link
            to="/login"
            className="font-semibold underline hover:text-pink-300"
          >
            Se connecter
          </Link>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            id="email"
            label="Email"
            {...register("email")}
            name="email"
            error={errors.email?.message}
          />
          <Input
            {...register("password")}
            type="password"
            id="password"
            label="Mot de Passe"
            name="password"
            error={errors.password?.message}
          />
          <Input
            {...register("passwordConfirm")}
            type="password"
            id="passwordConfirm"
            label="Confirmer le Mot de passe"
            name="passwordConfirm"
            error={errors.passwordConfirm?.message}
          />
          <Button
            type="submit"
            className="mt-2"
          >
            Créer un compte
          </Button>
          <div className="flex justify-center">
            <GoogleLogin
              shape="pill"
              onSuccess={async (credentialResponse) => {
                const response = jwtDecode(credentialResponse.credential);
                const userAlreadyCreated = await emailExisting(response.email);
                if (!userAlreadyCreated) {
                  const resp = await createUserWithGoogle(response);
                  if (resp.status === 200) {
                    await loginWithGoogle(response.email);
                  } else {
                    console.log("Erreur lors de la création du compte");
                  }
                } else {
                  await loginWithGoogle(response.email);
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </form>
      </Card>
    </>
  );
}

export default RegistrationPage;
