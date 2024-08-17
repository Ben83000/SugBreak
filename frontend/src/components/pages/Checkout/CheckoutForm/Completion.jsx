import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderContentMap from '../../Orders/OrderContentMap';
import formatDateToTime from '@/tools/formatDateToTime';

function Completion() {
  const location = useLocation();
  const [orderTime, setOrderTime] = useState();

  const { firstname, email } = location?.state?.orderCreated?.owner || {};
  const { id, content, date } = location?.state?.orderCreated || {};

  useEffect(() => {
    // un if pour eviter une erreur au chargement de la page
    if (location?.state?.orderCreated) {
      const orderHourReady = formatDateToTime(date, 20);
      setOrderTime(orderHourReady);
    }
  }, [date]);

  return (
    <section className="flex flex-col select-none flex-grow bg-amber-100 p-4 sm:p-6 gap-4 items-center">
      {location?.state?.orderCreated ? (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl text-amber-900">
              Merci d&apos;avoir commandé chez SugBreak, <span className="capitalize">{firstname}</span>!
            </h1>
            <p className="text-2xl">
              Votre commande N°{id} sera prête à {orderTime}.
            </p>
            <p className="text-xl ">
              Un mail de confirmation vient de vous être envoyé à l&apos;adresse mail suivante:{' '}
              <span className="underline">{email?.toLowerCase()}</span>.
            </p>
          </div>
          <div className="bg-white/70 p-1 rounded-xl w-64">
            <h2 className="underline text-2xl text-center">Contenu de votre commande</h2>
            <OrderContentMap orderContent={content} />
          </div>
          <Link to="/online-ordering" className="underline text-2xl">
            Retour au Menu
          </Link>
        </div>
      ) : (
        <Link to="/online-ordering" className="underline text-2xl">
          Retour au Menu
        </Link>
      )}
    </section>
  );
}

export default Completion;
