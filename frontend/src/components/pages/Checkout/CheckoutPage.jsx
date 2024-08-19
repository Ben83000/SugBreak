import CheckoutForm from "@/components/pages/Checkout/CheckoutForm/CheckoutForm";
import CartSection from "./CartSection/CartSection";


function CheckoutPage() {

  return (
    <section className="min-h-screen max-h-screen h-screen select-none overflow-hidden bg-amber-100 max-w-screen grid md:grid-cols-5 relative">
      <CheckoutForm />
      <CartSection />
    </section>
  );
}

export default CheckoutPage;
