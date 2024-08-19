import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import HoverCompoCard from '@/components/pages/Ordering/cart/HoverCompoCard';
import OrderContentMap from '@/components/pages/Orders/OrderContentMap';

function OrderContentModal({ orderContent }) {
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
    <section className="p-4 flex flex-col w-full overflow-y-scroll scrollbar-hide select-none" ref={scrollContainerRef}>
      <h1 className="text-2xl underline place-self-center mb-2">Contenu de votre commande</h1>
      <OrderContentMap orderContent={orderContent} />
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

export default OrderContentModal;
