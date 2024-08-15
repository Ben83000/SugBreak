import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./authContext";

export const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState([{}]);
  const [orders, setOrders] = useState([{}]);

  useEffect(() => {
    const fetchOrdersFromUser = async () => {
      if (auth) {
        const userOrders = await getUserOrders();
        setUserOrders(userOrders);
      }
    };
    fetchOrdersFromUser();
  }, [auth]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getOrders();
      setOrders(orders);
    };
    fetchOrders();
  }, []);

  const getUserOrders = async () => {
    const response = await fetch("http://localhost:5000/order/user", {
      credentials: "include",
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data.orders;
  };

  /**
   * get all orders
   * @returns all orders 
   */
  const getOrders = async () => {
    const response = await fetch("http://localhost:5000/order/all", {
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    return data.orders;
  };

  return (
    <OrderContext.Provider
      value={{
        userOrders,
        orders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
