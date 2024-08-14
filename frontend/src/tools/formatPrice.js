const formatPrice = (price) => {
  try {
    return typeof price === "number" ?
     price.toFixed(2).replace(".", ","): null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default formatPrice;
