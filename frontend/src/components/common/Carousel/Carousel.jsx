import { useEffect, useState } from "react";
import Slider from "react-slick";
import NextArrow from "@/components/common/Carousel/NextArrow";
import PrevArrow from "@/components/common/Carousel/PrevArrow";
import cn from "classnames";

function Carousel() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const importAllImages = async () => {
      // On importe tous les chemins des images du slider
      const imageModules = import.meta.glob("@/assets/images/slider/*.jpg");
      // On recup chaque valeur renvoyée (une fonc async) dans un tableau, puis on map ce tableau et on lance chaque func on on stocke chaque resolution dans un tableau (res = chemin d'acces img)
      const imagesArray = await Promise.all(
        Object.values(imageModules).map((module) => module())
      );
      setImages(imagesArray);
    };
    importAllImages();
  }, []);

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    slidesToShow: window.innerWidth > 450 ? 3 : 1,
    speed: 300,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow size="xl"  />,
    prevArrow: <PrevArrow size="xl" />,
    beforeChange: (current, next) => setImageIndex(next),
    autoplay: true,
    autoplaySpeed: 2000,
    swipeToSlide: true,
  };

  return (
    <section className="flex flex-col gap-4 justify-center items-center select-none z-0 p-4 bg-amber-900/80  max-w-full w-full">
      <h1 className=" text-slate-200 text-4xl">
        Pour le régime, on verra plus tard 😏
      </h1>
      <Slider
        className="w-full h-fit lg:w-3/4 bg-amber-100/70 rounded-3xl sm:rounded-full overflow-hidden"
        {...settings}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className={cn(
              "transition-transform p-6 sm:p-6 cursor-pointer",
              idx === imageIndex ? "scale-110 " : "scale-75 opacity-50"
            )}
          >
            <img
              src={img.default}
              alt="nos gourmandises"
              className="rounded-3xl max-[450px]:rounded-xxl active:outline-none max-[450px]:p-8 object-cover max-h-96 mx-auto"
            />
          </div>
        ))}
      </Slider>
      <div className=" text-slate-100 text-center text-2xl flex flex-col gap-6">
        <p className="">
          Sug Break, c&apos;est la garantie de manger des produits aux goûts
          uniques ! Toutes nos délicieuses gourmandises sont préparées avec des
          ingrédients de qualité et soigneusement choisis. Les pâtes sont toutes
          réalisées sur place (Churros, Gauffre, Crêpe, Pancake) & les glaces
          sont 100% artisanales pour des saveurs incomparables.
        </p>
        <h2>Alors qu&apos;attendez-vous pour vous régaler ?</h2>
      </div>
    </section>
  );
}

export default Carousel;
