import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import HoverCompoCard from '@/components/pages/Ordering/cart/HoverCompoCard';

function OrderContent({ orderContent }) {
  console.log(orderContent);
  const scrollContainerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: scrollContainerRef.current.clientHeight, // Taille du conteneur visible
        behavior: 'smooth', // Animation fluide
      });
    }
  };

  const handleScrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: -scrollContainerRef.current.clientHeight, // Taille du conteneur visible
        behavior: 'smooth', // Animation fluide
      });
    }
  };

  const checkOverflow = () => {
    if (scrollContainerRef.current) {
      const hasOverflow = scrollContainerRef.current.scrollHeight > scrollContainerRef.current.clientHeight;
      setIsOverflowing(hasOverflow);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight); // Un petit seuil pour le bas
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    checkOverflow();
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [orderContent]);

  return (
    <section className="p-4 flex flex-col w-full overflow-y-scroll scrollbar-hide" ref={scrollContainerRef}>
      <h1 className="text-2xl underline place-self-center mb-2">Contenu de votre commande</h1>
      {orderContent.map((item) => {
        console.log(item);
        return (
          <div className="grid grid-cols-orderContent gap-2 w-full" key={item?._id}>
            <p className="text-xl capitalize">
              {item?.product.custom && item?.product.category === 'waffle'
                ? item?.customisation?.base[0].label
                : item?.product.category === 'waffle'
                  ? item?.base
                  : item?.product.category === 'icecream'
                    ? 'Glace'
                    : item?.product.category}
            </p>
            <div className="flex items-center gap-1 w-full">
              {item?.product.custom ? (
                <Popover>
                  <PopoverTrigger className="text-xl underline text-amber-900">Customisation</PopoverTrigger>
                  <PopoverContent className="text-xl">
                    <HoverCompoCard customisation={item?.customisation} />
                  </PopoverContent>
                </Popover>
              ) : (
                <p className="text-xl">{item?.product.name}</p>
              )}
            </div>

            <p className="text-xl ml-auto w-full"> x{item?.quantity} </p>
          </div>
        );
      })}
      {isOverflowing && (
        <motion.button
          onClick={isAtBottom ? handleScrollUp : handleScrollDown}
          className="absolute bottom-4 right-8 text-amber-900"
          initial={{ translateX: '-50%' }}
          animate={{
            rotate: isAtBottom ? 180 : 0,
            transition: { type: 'spring' },
          }}
          transition={{ type: 'spring', stiffness: 300 }}>
          <FontAwesomeIcon size="2xl" icon={faCircleArrowDown} />
        </motion.button>
      )}
    </section>
  );
}

export default OrderContent;
