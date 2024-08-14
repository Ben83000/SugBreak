import { ColorRing } from "react-loader-spinner";

function Loader({ classname, height, width }) {
  return (
    <ColorRing
      wrapperClass={classname ?? "absolute left-4 top-16 z-50"}
      height={height ?? "80"}
      width={width ?? "80"}
      colors={["#be185d", "#db2777", "#db2777", "#db2777", "#be185d"]}
      ariaLabel="loading"
    />
  );
}



export default Loader;
