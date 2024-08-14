import { createContext, useState } from "react";

export const DeliveryContext = createContext();

export const DeliveryContextProvider = ({children}) => {

  const [delivery, setDelivery] = useState(null);

  const handleDelivery = (value) => {
    setDelivery(value);
  }

  return (
    <DeliveryContext.Provider value={{
      delivery,
      handleDelivery
    }}>
      {children}
    </DeliveryContext.Provider>
  )
}