async function getLatLngFromAddress(address) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBLVqhpQVQi5JEKdnOJcVe_Lbvui8QnRas`
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
