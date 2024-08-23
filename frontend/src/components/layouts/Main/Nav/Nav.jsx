import { useContext, useEffect, useState } from 'react';
import logo from '@/assets/images/logo.png';
import { Link } from 'react-router-dom';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import AuthContext from '@/contexts/authContext';
import ProfileDetails from '@/assets/icons/profileDetails';
import ScrollTextLine from '@/assets/icons/scrollTextLine';
import { Button } from '@/components/ui/button';
import cn from 'classnames';
import { Switch } from '@/components/ui/switch';
import { AdminContext } from '@/contexts/adminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import NavCart from './NavCart';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '@/contexts/cartContext';

function Nav({ transparent }) {
  const { auth, logout, user, admin } = useContext(AuthContext);
  const { toggleAdminMode, adminMode } = useContext(AdminContext);
  const { cartValue, cartContent } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(0);

  const countItemsInTheCart = () => {
    const itemsCount = cartContent.reduce((acc, current) => {
      return acc + current?.quantity || 0;
    }, 0);
    return itemsCount;
  };

  useEffect(() => {
    if (cartContent.length > 0) {
      const count = countItemsInTheCart();
      setCartCount(count);
    }
  }, [cartContent]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav
      className={cn(
        'flex w-full sticky select-none top-0 right-0 z-50 h-14 min-h-14 bg-black',
        transparent && 'bg-transparent'
      )}>
      <ul className="flex items-center px-6 h-full gap-4 w-full">
        <li>
          <Link to="/">
            <img src={logo} alt="logo" className="h-12" />
          </Link>
        </li>
        {admin && (
          <li className="flex gap-2 items-center text-white uppercase">
            <p>Mode Admin</p>
            <Switch checked={adminMode} onCheckedChange={toggleAdminMode} className="" />
          </li>
        )}

        <motion.li className="md:hidden ml-auto">
          <Sheet>
            <SheetTrigger className="uppercase font-semibold flex text-pink-400 select-none">
              <AnimatePresence mode="popLayout">
                <motion.div
                  initial={{ x: -5 }}
                  animate={{
                    x: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 200,
                      damping: 5,
                    },
                  }}
                  key={cartValue}
                  className="flex relative">
                  <FontAwesomeIcon size="lg" icon={faCartShopping} />
                  <p className="text-pink-500 leading-none rounded-full px-1 bg-white absolute -right-1 -top-2">
                    {cartCount}
                  </p>
                </motion.div>
              </AnimatePresence>
            </SheetTrigger>
            <SheetContent
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="min-w-[300px] max-sm:w-screen font-rancho h-screen text-2xl flex flex-col gap-2 bg-amber-100 p-0">
              <SheetHeader className="flex items-center justify-center p-4 shadow-custom-dark">
                <SheetTitle className="font-carter select-none flex gap-1 text-center text-pink-500 bg-amber-100 p-0 leading-none text-2xl">
                  Votre panier
                </SheetTitle>
              </SheetHeader>
              <NavCart />
            </SheetContent>
          </Sheet>
        </motion.li>

        <li className="md:ml-auto">
          <Sheet>
            <SheetTrigger className="flex uppercase select-none text-pink-400 font-semibold gap-1.5 items-center">
              <FontAwesomeIcon size="lg" icon={faUser} />
              <p className="text-lg max-md:hidden">Mon compte</p>
            </SheetTrigger>
            <SheetContent
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="px-0 min-w-[300px] max-sm:w-screen font-rancho text-2xl select-none">
              <SheetHeader className="gap-6 mt-6">
                <img src={logo} alt="logo" className="w-16 absolute top-4 left-4" />
                <SheetTitle className="font-carter text-center text-pink-400 text-2xl">Sug Break</SheetTitle>
              </SheetHeader>
              <Separator className="bg-pink-500 w-3/4 ml-auto my-6" />
              <section className="flex flex-col">
                {auth ? (
                  <section className="flex flex-col gap-6">
                    <SheetClose asChild>
                      <Link className="grid grid-cols-sheet text-slate-100 hover:text-pink-300" to="/profile">
                        <ProfileDetails />
                        <div className="flex flex-col">
                          <p>Mon profil</p>
                          <p className="text-slate-300">{user?.email}</p>
                        </div>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/orders" className="grid grid-cols-sheet text-slate-100 hover:text-pink-300">
                        <ScrollTextLine />
                        <p>Mes commandes</p>
                      </Link>
                    </SheetClose>
                    {admin && (
                      <>
                        <Separator className="bg-pink-500 w-3/4 ml-auto" />
                        <SheetClose asChild>
                          <Link
                            to="/admin/orderScreen"
                            className="grid grid-cols-sheet text-slate-100 hover:text-pink-300">
                            <ScrollTextLine />
                            <p>Affichage des commandes</p>
                          </Link>
                        </SheetClose>
                      </>
                    )}
                    <Button onClick={handleLogout} className="w-1/2 self-center text-2xl">
                      Déconnexion
                    </Button>
                  </section>
                ) : (
                  <Link
                    className="text-white bg-pink-500/80 mx-4 hover:bg-pink-500 text-center rounded-sm p-3"
                    to="/registration">
                    Connexion ou Inscription
                  </Link>
                )}
              </section>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
