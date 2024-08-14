import React from "react";

function OrderPart({ label, value, type, handleClick }) {

  return type === "button" ? (
    <div className="flex flex-col items-center">
      <p className="text-2xl text-pink-300">{label}</p>
      <button onClick={handleClick} className="text-xl mt-auto underline">
        {value}
      </button>
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <p className="text-2xl text-pink-300">{label}</p>
      <p className="mt-auto">{value}</p>
    </div>
  );
}

export default OrderPart;
