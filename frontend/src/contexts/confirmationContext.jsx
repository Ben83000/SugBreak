import Confirmation from "@/components/Modal/Confirm/Confirmation";
import { createContext, useContext, useState } from "react";
import { ModalContext } from "./modalContext";

// Créez le contexte
export const ConfirmationContext = createContext();

// Fournisseur du contexte
export const ConfirmationContextProvider = ({ children }) => {
  const [confirmation, setConfirmation] = useState(false);

  const { openModal } = useContext(ModalContext);

  const openConfirmationDialog = (
    e,
    type,
    confirmationMessage,
    onConfirm,
    onCancel
  ) => {
    openModal(
      <Confirmation
        type={type}
        confirmationMessage={confirmationMessage}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
      e.clientX,
      e.clientY,
      1
    );
  };

  const handleConfirmation = (choice) => {
    setConfirmation(choice);
  };

  return (
    <ConfirmationContext.Provider
      value={{
        confirmation,
        handleConfirmation,
        openConfirmationDialog,
      }}
    >
      {children}
    </ConfirmationContext.Provider>
  );
};
