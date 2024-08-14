import { createContext, useCallback, useState } from "react";

export const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState();

  const openModal = useCallback((content, x, y, size) => {
    setSize(size);
    setModalContent(content);
    setClickPosition({ x, y });
    setModalOpened(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpened(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        modalOpened,
        clickPosition,
        modalContent,
        size,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
