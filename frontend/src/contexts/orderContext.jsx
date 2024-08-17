import { createContext, useContext, useEffect, useState } from 'react';
import AuthContext from './authContext';

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
    const response = await fetch('http://localhost:5000/order/user', {
      credentials: 'include',
    });
    const data = await response.json();
    return data.orders;
  };

  /**
   * get all orders
   * @returns all orders
   */
  const getOrders = async () => {
    const response = await fetch('http://localhost:5000/order/all', {
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    return data.orders;
  };

  /**
   * Update an order
   * @param {number} orderId Order's id to update
   * @param {String} status Status to update the order: "pending", "preparing", "completed", "cancelled"
   */
  const updateOrder = async (orderId, status) => {
    const response = await fetch(`http://localhost:5000/order/update/${orderId}/${status}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setOrders(data.ordersUpdated);
  };

  return (
    <OrderContext.Provider
      value={{
        userOrders,
        orders,
        updateOrder,
      }}>
      {children}
    </OrderContext.Provider>
  );
};
