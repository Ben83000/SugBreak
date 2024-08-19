import { useContext, useState } from "react";
import Card from "@/components/common/Card";
import AuthContext from "@/contexts/authContext";
import { Link, useLocation } from "react-router-dom";
import Input from "@/components/common/Input";
import { Button } from "@/components/ui/button";

// On recup les paramètres de l'url
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EMAIL_REGEX = /\S+@\S+\.\S+/;

function RegisteredPage() {
  const query = useQuery();
  const status = query.get("status");
  const message = query.get("message");
  const { sendEmailConfirmation } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (EMAIL_REGEX.test(email)) {
      setIsLoading(true);
      try {
        await sendEmailConfirmation(email);
        setError("");
      } catch (error) {
        setError(
          "Erreur lors de l'envoi de l'email, veuillez reessayer dans quelques instants."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Email non valide.");
    }
  };

  return (
    <Card>
      <h1 className="text-center text-xl text-pink-200 ">{message}</h1>
      {(status === "already" || status === "success") ? (
        <Link
          to="/"
          className="underline text-center font-semibold text-lg hover:text-pink-300"
        >
          Retour à l&apos;Accueil
        </Link>
      ) : status === "error" ? (
        <>
          <p className="mt-2">
            Vous pouvez rentrer votre adresse email ci-dessous pour recevoir à
            nouveau un mail de confirmation:
          </p>
          <form onSubmit={handleClick}>
            <Input
              value={email}
              onChange={handleChange}
              placeholder="Tapez votre adresse email ici"
              error={error}
            />
            <Button disabled={isLoading} className="mt-4 w-full">
              {isLoading
                ? "Envoi en cours..."
                : "Recevoir un mail de confirmation"}
            </Button>
          </form>
        </>
      ) : (
        <Link className="underline text-2xl font-rancho text-center" to="/">Retour à l&apos;accueil</Link>
      )}
    </Card>
  );
}

export default RegisteredPage;
