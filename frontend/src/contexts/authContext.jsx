import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import notify from '@/tools/notify';
import config from '@/config/config';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [errorAuth, setErrorAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function refreshLog() {
      try {
        const response = await fetch(`${config.apiUrl}/user/profile`, {
          credentials: 'include',
        });
        if (response.ok) {
          const user = await response.json();
          if (user.isActive) {
            setAuth(true);
            setUser(user);
            if (user.isAdmin) {
              setAdmin(true);
            }
          } else {
            setAuth(false);
            setUser(user);
          }
        } else {
          setAuth(false);
          setUser(null);
        }
      } catch (error) {
        setAuth(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    refreshLog();
  }, []);

  // Création de compte via google (crée un compte utilisateur en base de données, mais sans mot de passe (car connexion via google))
  const createUserWithGoogle = async (data) => {
    const newUser = {
      email: data.email, // On recup l'email google
      firstname: data?.given_name || undefined, // On recup le prénom de la personne renseigné sur le compte google
      lastname: data?.family_name || undefined, // On recup le nom de la personne renseigné sur le compte google
    };

    const response = await fetch(`${config.apiUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    return response;
  };

  const createUser = async (data) => {
    const newUser = {
      email: data.email,
      password: data.password,
    };
    const response = await fetch(`${config.apiUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(newUser),
    });
    if (response.status === 200) {
      navigate('/registration/confirm');
      const userCreated = await response.json();
      setUser(userCreated);
    }
    return response;
  };

  const updateUser = async (data) => {
    const response = await fetch(`${config.apiUrl}/user/${encodeURIComponent(user.email)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const datas = await response.json();
      const userUpdated = datas.user;
      setUser(userUpdated);
      notify(datas.message, 'success', 5000);
    }
  };

  const loginWithGoogle = async (email) => {
    const response = await fetch(`${config.apiUrl}/user/loginWithGoogle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email: email }),
    });
    const status = response.status;
    const datas = await response.json();
    console.log(datas)
    switch (status) {
      case 200:
        navigate(`/online-ordering`);
        setUser(datas);
        setAuth(true);
        break;
    }
  };

  const login = async (user) => {
    const response = await fetch(`${config.apiUrl}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    });
    const status = response.status;
    const datas = await response.json();
    switch (status) {
      case 200:
        navigate(`/online-ordering`);
        setAuth(true);
        setUser(datas.user);
        if (datas.user.isAdmin) {
          setAdmin(true);
        }
        break;
      case 401:
        // Si c'est juste un probleme de confirmation d'email
        if (datas.typeError === 'emailConfirmation') {
          setUser(datas.user);
        }
        setErrorAuth({ message: datas.message, typeError: datas.typeError });
        break;
    }
  };

  const logout = async () => {
    await fetch(`${config.apiUrl}/user/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setAuth(false);
    if (admin) {
      setAdmin(false);
    }
    setUser(null);
    navigate('/online-ordering');
  };

  const sendEmailConfirmation = async (email) => {
    const resp = await fetch(`${config.apiUrl}/user/emailConfirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email: email }),
    });
    const datas = await resp.json();
    if (resp.ok) {
      notify(datas.message, 'success', 10000);
      setErrorAuth({});
    } else {
      notify(datas.message, 'error', 10000);
    }
  };

  const handleUser = (name, value) => {
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        createUser,
        createUserWithGoogle,
        updateUser,
        handleUser,
        errorAuth,
        auth,
        admin,
        user,
        loading,
        login,
        loginWithGoogle,
        logout,
        sendEmailConfirmation,
        setErrorAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
