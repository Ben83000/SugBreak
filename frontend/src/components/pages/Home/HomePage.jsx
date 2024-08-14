import videoBg from "@/assets/videos/videoBg1.mp4";
import SoundOn from "@/assets/icons/soundOn";
import SoundOff from "@/assets/icons/soundOff";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DeliveryContext } from "@/contexts/deliveryContext";

function HomePage() {
  const [sound, setSound] = useState(false);
  const { handleDelivery } = useContext(DeliveryContext);

  const handleSoundClick = () => {
    setSound(!sound);
  };

  return (
    <div className="">
      <div className="w-full min-h-screen flex flex-col relative">
        <video
          src={videoBg}
          autoPlay
          loop
          muted={!sound ? true : false}
          className="w-full h-screen object-cover"
        />
        <div className="absolute w-full h-full top-0 left-0 flex bg-black/40">
          <div className="relative w-full h-full flex flex-col items-center">
            {!sound ? (
              <SoundOff onSoundClick={handleSoundClick} />
            ) : (
              <SoundOn onSoundClick={handleSoundClick} />
            )}
            <div className="relative top-10 flex flex-col sm:top-32 gap-8 p-2 sm:p-0">
              <h1 className="text-7xl sm:text-8xl font-carter text-center text-shadow text-pink-500 select-none">
                Sug Break
              </h1>
              <div className="flex flex-col gap-4 justify-center items-center">
                <Link
                  className="flex items-center justify-center p-4 cursor-pointer w-full border-4 text-white text-4xl rounded-2xl font-carter
            hover:text-pink-300 hover:border-pink-400 active:ring-2 active:ring-white select-none"
                >
                  LIVRAISON
                </Link>
                <Link
                  onClick={() => handleDelivery("takeaway")}
                  to="/online-ordering"
                  className="flex items-center justify-center p-4 cursor-pointer w-full border-4 text-white text-4xl rounded-2xl font-carter
            hover:text-pink-300 hover:border-pink-400 active:ring-2 active:ring-white select-none"
                >
                  A EMPORTER
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
