import { Separator } from "@/components/ui/separator";
import OrderPart from "./OrderPart";
import formatPrice from "@/tools/formatPrice";
import formatDate from "@/tools/formatDate";
import React, { useContext } from "react";
import { ModalContext } from "@/contexts/modalContext";
import OrderContentModal from "@/components/Modal/OrderContent/OrderContentModal";

function Order({ item, index }) {
  const { openModal } = useContext(ModalContext);

  const handleClick = (e) => {
    openModal(<OrderContentModal orderContent={item?.content} />, e.clientX, e.clientY, 3)
  };

  const orderDetails = [
    { label: "Date", value: formatDate(item?.date) },
    { label: "Numéro", value: item?.id },
    { label: "Contenu", value: "Voir", type: "button", handleClick },
    { label: "Prix", value: `${formatPrice(item?.totalAmount)}€` },
    { label: "Statut", value: item?.status === "pending" ? "En cours" : "Livrée", },
  ];

  return (
    <div
      className="flex bg-pink-950 shadow-inner shadow-pink-500 p-2 rounded-xl gap-2 h-20 justify-around"
      key={index}
    >
      {orderDetails.map((details, index) => {
        return (
          <React.Fragment key={index}>
            <OrderPart {...details} />
            {index < orderDetails.length - 1 && (
              <Separator orientation="vertical" className="bg-pink-500" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Order;
