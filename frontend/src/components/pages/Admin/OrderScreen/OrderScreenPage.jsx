import { OrderContext } from '@/contexts/orderContext';
import formatDateToTime from '@/tools/formatDateToTime';
import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ModalContext } from '@/contexts/modalContext';
import Confirmation from '@/components/Modal/Confirm/Confirmation';
import calculateDiffInMin from '@/tools/calculateDiffInMin';

function OrderScreenPage() {
  const { orders, updateOrder } = useContext(OrderContext);
  const { openModal, closeModal } = useContext(ModalContext);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // On provoque un rendu chaque min pour changer la couleur automatique de la commande si ca depasse 15min
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now()) // on provoque un changement d'etat local pour provoquer un re rendu chaque min
    }, 60000); // 1 minute
    return () => clearInterval(intervalId); // Nettoyage de l'interval au demontage
  }, []);

  const handleConfirm = async (id) => {
    await updateOrder(id, 'completed');
    closeModal();
  };

  const handleClick = (e, item) => {
    openModal(
      <Confirmation
        confirmationMessage={`Valider la commande N°${item?.id} ?`}
        onConfirm={() => handleConfirm(item?._id)}
        onCancel={closeModal}
      />,
      e.clientX,
      e.clientY,
      1
    );
  };

  return (
    <section className="flex flex-grow bg-amber-100 flex-nowrap p-2 overflow-x-scroll gap-2">
      {orders?.map((item, index) => {
        if (item?.status === 'pending')
          return (
            <div key={item._id} className="bg-white/70 min-w-96 min-h-full h-min flex flex-col flex-shrink-0">
              <div
                className={cn('w-full bg-amber-200 pt-4 pl-4 pr-4 pb-1 relative', {
                  'bg-red-500': calculateDiffInMin(currentTime, new Date(item?.date)) > 15, // Si ça fait + de 15min que la commande est à l'ecran, elle apparait en rouge
                })}>
                <p className="text-3xl underline underline-offset-4">
                  Commande N°{item.id} à {formatDateToTime(item.date)}
                </p>
                <p className="text-2xl capitalize">
                  {item.owner?.firstname} {item.owner?.lastname} {item.owner?.phone}
                </p>
                <button
                  onClick={(e) => handleClick(e, item)}
                  className="absolute z-10 right-4 top-4 bg-green-700 text-amber-100 p-1 rounded-md hover:bg-green-600">
                  <FontAwesomeIcon size="2xl" icon={faCheck} />
                </button>
              </div>
              <div className="pt-2 pb-2">
                {item?.content?.map((item, index) => {
                  return (
                    <div
                      className={cn('grid grid-cols-12 gap-2 w-full pr-2 pl-2', {
                        'border-t border-b border-slate-400': index % 2 !== 0,
                      })}
                      key={item?.product._id}>
                      <p className="text-3xl capitalize col-span-4 text-amber-900">
                        {item.product.custom && item.product.category === 'waffle'
                          ? item.customisation?.base[0].label
                          : item.product.category === 'waffle'
                            ? item.base
                            : item.product.category === 'icecream'
                              ? 'Glace'
                              : item.product.category}
                      </p>
                      <div className="flex flex-col leading-none w-full col-span-7">
                        {item?.product?.custom ? (
                          Object.keys(item?.customisation).map((customTitle, index) => {
                            return (
                              <div key={index} className="flex items-center gap-1 flex-wrap">
                                <h2 className="capitalize text-2xl underline ">
                                  {customTitle === 'extraFruit' ? 'Fruit(s)' : customTitle}:
                                </h2>
                                {item?.customisation[customTitle]?.map((customValues, index) => {
                                  return (
                                    <p className="text-2xl" key={index}>
                                      {customValues.label || customValues}
                                    </p>
                                  );
                                })}
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-2xl">{item.product.name}</p>
                        )}
                      </div>
                      <p className="text-2xl ml-auto col-span-1"> x{item.quantity} </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
      })}
    </section>
  );
}

export default OrderScreenPage;
