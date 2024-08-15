import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React from 'react'
import HoverCompoCard from '../Ordering/cart/HoverCompoCard';

function OrderContentMap({ orderContent }) {
  return (
 orderContent.map((item) => {
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
      })
  )
}

export default OrderContentMap
