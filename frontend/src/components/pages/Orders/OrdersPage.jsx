import { useContext } from "react";
import Order from "./Order";
import { OrderContext } from "@/contexts/orderContext";
import BackButton from "@/components/layouts/BackButton";


function OrdersPage() {
  const { userOrders } = useContext(OrderContext);


  return (
    <section className="bg-black flex-grow sm:p-8 flex flex-col text-white select-none">
      <BackButton />
      <h1 className="text-3xl text-center mb-8">Mes commandes</h1>
      <section className="flex flex-col w-full sm:w-[640px] mx-auto gap-4">
        {userOrders.map((item, index) => {
          return (
            <Order key={item.product?.name} item={item} index={index} />
          );
        })}
      </section>
    </section>
  );
}

export default OrdersPage;
