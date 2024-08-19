import { createContext, useContext, useEffect, useState } from 'react';
import AuthContext from './authContext';
import { io } from 'socket.io-client';
import config from '@/config/config';

export const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState([{}]);
  const [orders, setOrders] = useState([{}]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(`${config.apiUrl}`); // Connexion au serveur socket
    setSocket(socketIo);

    // On ecoute les events nommées 'newOrder'
    socketIo.on('newOrder', (newOrder) => {
      setOrders((prevOrders) => [...prevOrders, newOrder]); // des qu'un event 'newOrder' est reçu par le serveur, on met a jour les orders
    });

    // Nettoyage lors du démontage du composant
    return () => {
      socketIo.disconnect(); // Déconnecter le socket lors du démontage
    };
  }, []);

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
    const response = await fetch(`${config.apiUrl}/order/user`, {
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
    const response = await fetch(`${config.apiUrl}/order/all`, {
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
    const response = await fetch(`${config.apiUrl}/order/update/${orderId}/${status}`, {
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
