import { Button } from "@/components/ui/button";

function Confirmation({ confirmationMessage, onConfirm, onCancel }) {
  return (
    <section className=" flex flex-col items-center justify-center w-full p-2 gap-2 max-sm:gap-2 ">
      <p className="text-4xl text-amber-900 leading-none">
        Confirmation de votre choix
      </p>
      <p className="text-3xl leading-none text-center">{confirmationMessage}</p>
      <div className="grid gap-1 sm:grid-cols-2 max-sm:grid-rows-2 w-full max-sm:h-1/4">
        <Button onClick={onConfirm} className="text-2xl h-full">
          Confirmer le choix
        </Button>
        <Button
          onClick={onCancel}
          className="text-2xl h-full bg-red-600 hover:bg-red-700"
        >
          Annuler
        </Button>
      </div>
    </section>
  );
}

export default Confirmation;
