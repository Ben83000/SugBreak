import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import menuData from '@/tools/menu.json';
import cn from 'classnames';

function SubNavMobile() {
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const [windowSmall, setWindowSmall] = useState(window.innerWidth < 450);

  const NextArrow = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        className={cn(
          'absolute right-0 translate-x-full z-10 top-1/2 -translate-y-1/2 text-slate-900/70 hover:text-slate-900 cursor-pointer rounded-full p-1',
          !showNext && 'hidden'
        )}
        onClick={onClick}
        icon={faArrowRight}
      />
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        className={cn(
          'absolute left-0 -translate-x-full z-10 top-1/2 -translate-y-1/2 text-slate-900/70 hover:text-slate-900 cursor-pointer rounded-full p-1',
          !showPrev && 'hidden'
        )}
        onClick={onClick}
        icon={faArrowLeft}
      />
    );
  };

  const settings = {
    infinite: false,
    lazyLoad: true,
    slidesToShow: windowSmall ? 2 : 3,

    speed: 300,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipeToSlide: true,
    beforeChange: (current, next) => {
      setShowPrev(next > 0);
      setShowNext(next < menuData.length - 3); // Adjust this number based on slidesToShow
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) {
        setWindowSmall(true);
      } else {
        setWindowSmall(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <nav className="flex justify-center w-full text-xl sm:hidden bg-amber-100/70 backdrop-blur-sm sticky top-14 z-10">
      <Slider className="w-4/5" {...settings}>
        {menuData.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.category}
              offset={-100}
              smooth={true}
              spy={true}
              duration={500}
              className={cn(
                'text-center py-1 cursor-pointer',
                selectedMenuItem === index ? 'text-pink-600' : 'text-slate-950'
              )}
              onSetActive={() => {
                setSelectedMenuItem(index);
              }}>
              {item.name}
            </Link>
          );
        })}
      </Slider>
    </nav>
  );
}

export default SubNavMobile;
