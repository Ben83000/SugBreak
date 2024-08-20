const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

/**
 * get the lat & long from adress with geocode api by google
 * @param {String} address to localize 
 * @returns location
 */
async function getLatLngFromAddress(address) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return location;
    } else {
      throw new Error("Adresse introuvable.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des coordonnées :", error);
    return null;
  }
}

export default getLatLngFromAddress;
