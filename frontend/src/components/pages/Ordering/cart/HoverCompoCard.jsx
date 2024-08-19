function HoverCompoCard({ customisation }) {
  
  return (
    <section className="flex flex-col p-2 font-rancho select-none">
      {Object.keys(customisation).map((item, index) => {
        const length = customisation[item]?.length-1;
        return (
        <div key={index} className="flex gap-x-1 flex-wrap leading-none">
          <h2 className="capitalize text-pink-600 font-semibold">
            {item === "extraFruit" ? "Fruit(s)" : item} :
          </h2>
          {customisation[item].map((item, index) => {
            console.log(item)
            return (
              <p className="text-pink-500" key={index}>
                {item.label || item}
                {index < length && ","}
              </p>
            );
          })}
        </div>
      )})}
    </section>
  );
}

export default HoverCompoCard;
