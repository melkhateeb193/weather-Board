import PlaceIcon from "@mui/icons-material/Place";
import SearchIcon from "@mui/icons-material/Search";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SliderBtn from "./SliderBtn";

export default function NavBar({displayValue,handleButtonClick,inputValue,handleInputChange,country}) {

  return (
    <header className="flex flex-col sm:flex-row gap-5 sm:justify-around justify-center items-center  ">
      <div className="location flex">
        <PlaceIcon />
        <p>{`${country} ,${displayValue}`}</p>
      </div>
      <div className="search bg-zinc-800 p-2 rounded-full min-w-[20rem]">
        <label className="bg-inherit" onClick={handleButtonClick}>
          <SearchIcon sx={{ backgroundColor: "transparent" }} />
          <input
            className="ml-2 bg-inherit focus:outline-none"
            type="text"
            placeholder="search city ...."
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="profile_toggle flex items-center">
        <SliderBtn
          left={<WbSunnyIcon />}
          right={<NightlightIcon />}
          width={" flex justify-center items-start w-[5rem]"}
        />

        <div className="hidden sm:block ml-4">
          <img
            className="w-10 h-10 rounded-full"
            src="/436088066_7931395543545743_1167575129986485417_n.jpg"
            alt="img"
          />
        </div>
      </div>
    </header>
  );
}
