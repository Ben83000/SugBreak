import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderContentMap from '../../Orders/OrderContentMap';

function Completion() {
  const location = useLocation();
  const [orderTime, setOrderTime] = useState();
  console.log(location);
  console.log(location.state);

  const { firstname, email } = location?.state?.orderCreated?.owner || {};
  const { id, content, date } = location?.state?.orderCreated || {};

  useEffect(() => {
    // If pour eviter une erreur
    if (location?.state?.orderCreated) {
      const orderDate = new Date(date);
      orderDate.setMinutes(orderDate.getMinutes() + 20);
      // Permet de recuperer la bonne heure meme si le pc/tel du client a une heure erronée
      const orderHourReady = new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Paris',
      })
        .format(orderDate)
        .replace(':', 'h');
      setOrderTime(orderHourReady);
    }
  }, [date]);

  return (
    <section className="flex flex-col flex-grow bg-amber-100 p-4 sm:p-6 gap-4 items-center h-screen min-h-screen">
      {location?.state?.orderCreated ? (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl">
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
            <h2 className="underline text-2xl text-center">Contenu</h2>
            <OrderContentMap orderContent={content} />
          </div>
          <Link to="/online-ordering" className="underline text-xl">
            Retour au Menu
          </Link>
        </div>
      ) : (
        <Link to="/online-ordering" className="underline text-xl">
          Retour au Menu
        </Link>
      )}
    </section>
  );
}

export default Completion;
