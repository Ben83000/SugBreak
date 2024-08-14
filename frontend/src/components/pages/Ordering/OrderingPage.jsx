import SubNav from '@/components/pages/Ordering/SubNav/SubNav';
import MenuAll from '@/components/pages/Ordering/Menu/MenuAll';
import Cart from '@/components/pages/Ordering/cart/Cart';
import SubNavMobile from '@/components/pages/Ordering/SubNav/SubNavMobile';
import Carousel from '@/components/common/Carousel/Carousel';

function OrderingPage() {
  return (
    <>
      <section className="md:grid md:grid-cols-[minmax(18rem,auto)_1fr_1fr_1fr] flex">
        <Cart />

        <div className="bg-amber-100/70 w-full md:col-span-3">
          <SubNav />
          <SubNavMobile />
          <MenuAll />
          <Carousel />
        </div>
      </section>
    </>
  );
}

export default OrderingPage;
