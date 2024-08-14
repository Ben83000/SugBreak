import Input from "@/components/common/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import userLoginSchema from "@/models/userLoginSchema";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from "react";
import AuthContext from "@/contexts/authContext";
import { GoogleLogin } from "@react-oauth/google";
import emailExisting from "@/tools/emailExisting";
import Card from "@/components/common/Card";

function LoginPage() {
  const {
    login,
    loginWithGoogle,
    errorAuth,
    createUserWithGoogle,
    user,
    sendEmailConfirmation,
    setErrorAuth,
  } = useContext(AuthContext);

  useEffect(() => {
    if (errorAuth.message) {
      setErrorAuth({});
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLoginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(errorAuth.message)
  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <Card>
      <div className="mx-auto text-white text-center leading-tight">
        <h1 className="font-semibold text-lg text-pink-200">Connexion</h1>
        <p>Vous n&apos;avez pas de compte ?</p>
        <Link
          to="/registration"
          className="font-semibold underline hover:text-pink-300"
        >
          S&apos;inscrire
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
        {errorAuth.message && <p className="text-red-300">{errorAuth.message}</p>}
        {errorAuth.typeError === "emailConfirmation" && (
          <p className="text-white">
            Vous n&apos;avez rien reçu ?
            <span
              className="mx-1 underline cursor-pointer hover:text-pink-300"
              onClick={async () => {
                console.log(user);
                await sendEmailConfirmation(user?.email);
              }}
            >
              Cliquez ici
            </span>
            pour recevoir un mail de confirmation. Pensez également à vérifier
            vos spams!
          </p>
        )}

        <Button
          type="submit"
          className="p-5 mt-2 w-full text-lg font-semibold text-white border-none rounded-xl bg-pink-600/80 hover:bg-pink-600 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-pink-500"
        >
          Se connecter
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
  );
}

export default LoginPage;
