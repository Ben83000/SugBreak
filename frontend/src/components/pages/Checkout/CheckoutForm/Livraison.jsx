import { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import getLatLngFromAddress from "@/tools/getLatLngFromAdress";

const API_GOOGLE = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function Shipping({ handleStep, checkoutData, setCheckoutData }) {
  console.log(checkoutData);
  const [deliveryMode, setDeliveryMode] = useState("takeaway");
  const [addressPosition, setAddressPosition] = useState(null);

  useEffect(() => {
    async function getCustomerLocation() {
      const customerLocation = await getLatLngFromAddress(
        checkoutData?.address,
        checkoutData?.zip,
        checkoutData?.city
      );
      setAddressPosition(customerLocation);
    }
    getCustomerLocation();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setDeliveryMode(value);
  };

  const mapContainerStyle = {
    width: "100%",
    height: "200px",
  };

  const shopLocation = {
    lat: 48.9159006,
    lng: 2.4588404,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_GOOGLE,
    libraries: ["marker"],
  });

  const handleClick = () => {
    setCheckoutData((prevData) => ({
      ...prevData,
      deliveryMode: deliveryMode,
    }));
    handleStep();
  };

  return (
    <section className="w-full flex flex-col gap-2 items-center">
      <h1 className="text-2xl font-semibold text-center">Mode de Livraison</h1>
      <select
        className="rounded-lg text-xl p-1 w-1/2"
        name="deliveryMode"
        id="deliveryMode"
        value={deliveryMode}
        onChange={handleChange}
      >
        <option value="takeaway">Retrait sur place</option>
        <option disabled value="delivery">Livraison (Bientôt disponible)</option>
      </select>
      <section className="flex w-2/3 lg:w-1/2">
        {deliveryMode === "takeaway" ? (
          <div className="flex flex-col items-center w-full text-center">
            <h2 className="text-xl font-semibold leading-none">Emplacement du retrait</h2>
            <p className="mb-1 ">196 Avenue Jean Jaurès, 93700 Drancy</p>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={shopLocation}
                zoom={18}
              >
                <MarkerF position={shopLocation} />
              </GoogleMap>
            ) : loadError ? (
              <div>Error loading map</div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full text-center">
            <h2 className="text-xl font-semibold leading-none">Livraison à l&apos;adresse suivante:</h2>
            <p className="mb-1">
              {checkoutData?.address}, {checkoutData?.zip} {checkoutData?.city}
            </p>

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={addressPosition}
              zoom={18}
            >
              <MarkerF position={addressPosition} />
            </GoogleMap>
          </div>
        )}
      </section>
      <button
        onClick={handleClick}
        type="button"
        className=" bg-slate-900 text-white text-xl p-2 border-none rounded-xl font-semibold w-2/3 lg:w-1/2 mt-1"
      >
        Passer au paiement
      </button>
    </section>
  );
}

export default Shipping;
