import { useContext, useState } from 'react';
import Up from '@/assets/icons/up';
import cn from 'classnames';
import AddProductForm from '@/components/layouts/Main/AdminPanel/AddProductForm.jsx';
import ModifyProductForm from './ModifyProductForm';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminContext } from '@/contexts/adminContext';
import AddProductFormMobile from './AddProductFormMobile';
import ModifyProductFormMobile from './ModifyProductFormMobile';

function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { adminMode } = useContext(AdminContext);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Ajouter un produit', 'Modifier un produit'];

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleTab = (index) => {
    setActiveTab(index);
  };

  return (
    <AnimatePresence mode="wait">
      {adminMode && (
        <motion.div
          key="adminpan"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`md:ml-[19rem] w-[36rem] max-sm:w-full rounded-tr-xl shadow-custom-admin fixed bottom-0 left-0 right-0 h-1/3 bg-amber-100  transition-transform duration-500 ease-in-out z-50
          max-sm:h-2/3 
           ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex absolute -translate-y-full">
            <div className="bg-amber-100 rounded-t-lg cursor-pointer shadow-custom-admin">
              <Up
                className={`transition-transform duration-500 ease-in-out ${isOpen && 'rotate-180'}`}
                onClick={togglePanel}
              />
            </div>
            {tabs.map((tab, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleTab(index)}
                  className={cn(
                    'shadow-custom-admin  w-fit flex text-xl px-2 py-1 ml-0.5 rounded-t-lg  cursor-pointer',
                    activeTab === index ? 'bg-amber-100 text-amber-900' : 'bg-amber-900 text-white'
                  )}>
                  {tab}
                </div>
              );
            })}
          </div>

          {activeTab === 0 && (
            <>
              <AddProductForm /> <AddProductFormMobile />
            </>
          )}
          {activeTab === 1 && (
            <>
              <ModifyProductForm /> <ModifyProductFormMobile />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AdminPanel;
