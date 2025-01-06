import { useState } from "react";
import PropTypes from "prop-types";

export default function SliderBtn({left , right ,styles }) {
    const [active, setActive] = useState("forecast"); 

  return (
    <div className="forcast">
    <div className={`relative  bg-slate-600  rounded-full  ${styles}`}>
    <div className="flex ">
      <button
        className={`${
          active === "forecast" ? "bg-blue-300 text-black" : "bg-gray-600 text-black"
        } p-2 rounded-full transition-all duration-300 w-full `}
        onClick={() => setActive("forecast")}
      >
        {left}
      </button>
      <button
        className={`${
          active === "airQuality" ? "bg-blue-300 text-black" : "bg-gray-600 text-black"
        } p-2 rounded-full transition-all duration-300 w-full`}
        onClick={() => setActive("airQuality")}
      >
       {right}
      </button>
    </div>

    <div
      className={`absolute   left-0 h-1 w-1/2 bg-white transition-all duration-300 ${
        active === "forecast" ? "transform translate-x-0" : "transform translate-x-full"
      }`}
    ></div>
  </div>
    </div>
  )
}

SliderBtn.propTypes = {
  left: PropTypes.string.isRequired,  
  right: PropTypes.string.isRequired, 
  styles: PropTypes.string,    
};


SliderBtn.defaultProps = {
  styles: "",
};