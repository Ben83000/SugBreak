import { createContext, useContext, useEffect, useState } from 'react';
import AuthContext from '@/contexts/authContext';
import notify from '@/tools/notify';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartContent, setCartContent] = useState([]);
  const [cartValue, setCartValue] = useState(0);
  const { auth } = useContext(AuthContext);
  const [lastAction, setLastAction] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      if (auth) {
        const userCart = await getCart();
        updateCart(userCart);
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
        updateCart(guestCart);
      }
    };
    fetchCart();
  }, [auth]);

  useEffect(() => {
    const calculateCartValue = () => {
      const total = cartContent.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);
      const totalFormatted = parseFloat(total.toFixed(2));
      setCartValue(totalFormatted);
    };
    calculateCartValue();
  }, [cartContent]);

  const updateCart = (newCart) => {
    setCartContent(newCart);
  };

  const getCart = async () => {
    const response = await fetch('http://localhost:5000/cart', {
      credentials: 'include',
    });
    if (response.ok) {
      const datas = await response.json();
      return datas;
    } else {
      return [];
    }
  };

  const addToCart = async (product, base, totalPrice) => {
    if (auth) {
      const response = await fetch(`http://localhost:5000/cart/add/${product._id}/${base}/${totalPrice}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const datas = await response.json();
        notify('Ajouté au panier.', 'success');
        updateCart(datas.cart);
      }
    } else {
      // Gestion pour les utilisateurs non authentifiés
      let existingItem; // initialisation de la variable de l'item potentiellement deja existant dans le panier
      // Si le produit a ajouter au panier est de categorie waffle, il faut verifier l'id + la base
      if (product.category === 'waffle') {
        existingItem = cartContent.find((item) => item.product._id === product._id && item.base === base); // Sinon on ne vérifie que si un produit avec le meme id existe déjà
      } else {
        existingItem = cartContent.find((item) => item.product._id === product._id);
      }
      // Si un produit existant a été trouvé
      if (existingItem) {
        const guestCart = cartContent.map((item) => {
          // Si cest un produt de categorie waffle, on refait la double verif pour trouver le bon produit sur lequel modifier la quantité
          if (product.category === 'waffle') {
            return item.product._id === product._id && item.base === base
              ? { ...item, quantity: item.quantity + 1 } // On renvoie le produit avec la quantité mise à jour
              : item; // on renvoie egalement les autres produits non modifiés
          } else {
            return item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 } // produit mis à jour
              : item; // autres produits du panier
          }
        });
        updateCart(guestCart); // le panier est mis à jour
        notify('Ajouté au panier.', 'success');
        localStorage.setItem('guestCart', JSON.stringify(guestCart)); // mise a jour du panier invite ds le localstorage
        // Si aucun produit n'a été trouvé deja existant ds le panier, alors on l'ajoute
      } else {
        const guestCart = [
          ...cartContent,
          {
            product: { ...product, price: totalPrice ?? product.price },
            base: base,
            quantity: 1,
          },
        ];
        updateCart(guestCart); // mise à jour du panier
        notify('Ajouté au panier.', 'success');
        localStorage.setItem('guestCart', JSON.stringify(guestCart)); // mise à jour du panier invité ds le localstorage
      }
    }
  };

  /**
   * Add a custom product to cart
   * @param {object} product The product to add to cart
   * @param {object} data Customisation of the product ({base, topping..})
   * @param {number} totalPrice The total price of the product with the customisation
   */
  const addToCartCustom = async (product, data, totalPrice) => {
    if (auth) {
      const response = await fetch(`http://localhost:5000/cart/add/custom/${product._id}/${totalPrice}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const datas = await response.json();
        updateCart(datas.cart);
        notify('Ajouté au panier.', 'success');
      }
    } else {
      const guestCart = [
        ...cartContent,
        {
          product: { ...product, price: totalPrice ?? product.price },
          customisation: data, // la customisation du produit custom
          quantity: 1,
        },
      ];
      updateCart(guestCart);
      notify('Ajouté au panier.', 'success');
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
    }
  };

  const cleanCart = async () => {
    // Si l'utilisateur est authentifié (et donc connecté) on vide son panier coté back
    if (auth) {
      try {
        const response = await fetch(`http://localhost:5000/cart/clean`, {
          method: 'PATCH',
          credentials: 'include',
        });
        if (response.ok) {
          updateCart([]); // panier mis à jour avec un tableau vide
        }
      } catch (error) {
        console.log(error);
      }
      // Si l'utilisateur n'est pas authentifié
    } else {
      localStorage.setItem('guestCart', JSON.stringify([])); // on vide le panier 'invité' du localStorage
      updateCart([]); // cartContent mis à jour avec un tableau vide
    }
  };

  /**
   * Modify product's quantity
   * @param {String} id Product's id to modify quantity
   * @param {String} action Type "more" or "less" (more or less quantity)
   */
  const handleQuantity = async (id, action) => {
    setLastAction(action);
    if (auth) {
      const response = await fetch(`http://localhost:5000/cart/${id}/${action}`, {
        method: 'PATCH',
        credentials: 'include',
      });
      const data = await response.json();
      updateCart(data.cart);
    } else {
      const guestCart = cartContent
        .map((item) => {
          return item.product._id === id
            ? {
                ...item,
                quantity: action === 'more' ? item.quantity + 1 : item.quantity - 1,
              }
            : item;
        })
        .filter((item) => item.quantity > 0); // Retire les articles avec une quantité de 0
      updateCart(guestCart);
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartContent,
        cartValue,
        lastAction,
        handleQuantity,
        addToCart,
        addToCartCustom,
        updateCart,
        cleanCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
