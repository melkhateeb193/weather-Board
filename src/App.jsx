import { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Charts from "./components/Charts";
import Maps from "./components/Maps";
import LeftCards from "./components/LeftCards";
import LeftSIde from "./components/LeftSIde";
import NavBar from "./components/navBar";

function App() {
  const [cardObj, setCardObj] = useState({});
  const [coord, setCoord] = useState({ lat: "26.557", lon: "31.6948" });
  const [filteredData, setFilteredData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("today");
  const [inputValue, setInputValue] = useState("");
  const [displayValue, setDisplayValue] = useState("sohag");
  const [country, setCountry] = useState("EG");

  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(apiKey)
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${displayValue}&appid=${apiKey}`;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue.trim()) {
      setDisplayValue(inputValue.trim());
    }
    setInputValue("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        const sunRise = result.city.sunrise;
        const sunSet = result.city.sunset;
        const time = result.city.timezone;
        const country = result.city.country;
        const lat = result.city.coord.lat;
        const lon = result.city.coord.lon;

        setCoord({ lat, lon });

        const localTime = (timezoneOffset) => {
          const nowUTC = new Date();
          const localTime = new Date(nowUTC.getTime() + timezoneOffset);
          return localTime.toLocaleTimeString();
        };

        const timeNow = localTime(time);
        const sunRiseTime = new Date(sunRise * 1000).toLocaleTimeString();
        const sunSetTime = new Date(sunSet * 1000).toLocaleTimeString();
        setCardObj({ timeNow, sunRiseTime, sunSetTime });
        setCountry(country);

        // Set forecast data
        setForecastData(result.list);
        filterForecastData(result.list, selectedFilter);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [displayValue, selectedFilter]);

  const filterForecastData = (data, filter) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const next7Days = new Date(today);
    next7Days.setDate(today.getDate() + 7);

    let filtered = [];

    if (filter === "today") {
      filtered = data.filter((item) => {
        const forecastDate = new Date(item.dt * 1000);
        return forecastDate.toLocaleDateString() === today.toLocaleDateString();
      });
    } else if (filter === "tomorrow") {
      filtered = data.filter((item) => {
        const forecastDate = new Date(item.dt * 1000);
        return (
          forecastDate.toLocaleDateString() === tomorrow.toLocaleDateString()
        );
      });
    } else if (filter === "nextSevenDays") {
      const now = new Date();

      const next7Days = new Date();
      next7Days.setDate(now.getDate() + 7);
      const uniqueDays = new Set();
      filtered = data.filter((item) => {
        const forecastDate = new Date(item.dt * 1000);
        const dateStr = forecastDate.toISOString().split("T")[0];
        if (forecastDate <= next7Days && !uniqueDays.has(dateStr)) {
          uniqueDays.add(dateStr);
          return true;
        }
        return false;
      });

      console.log(filtered);
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    filterForecastData(forecastData, filter);
  };

  return (
    <main className="p-4 sm:p-6 min-h-screen">
      <NavBar
        country={country}
        displayValue={displayValue}
        handleButtonClick={handleButtonClick}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-4 pt-6">
        {/* Left Side Container */}
        <div className="leftSide md:col-span-3 w-full max-h-full">
          <LeftSIde filterByDay={handleFilterChange} />
          <div className="top mt-4 flex justify-center md:justify-start">
            <Cards cardObj={cardObj} forecastData={filteredData} />
          </div>
          <div className="bottom mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h2 className="text-base md:text-lg font-semibold">Global map</h2>
              <button className="mt-2 md:mt-0 px-3 py-2 text-sm md:px-4 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View wide
              </button>
            </div>
            <div className="map mt-4">
              <Maps coord={coord} />
            </div>
          </div>
        </div>

        {/* Right Side Container */}
        <div className="md:col-span-1 max-h-fit">
          {/* Right Side top Container */}
          <div className="mt-6 md:mt-0 flex flex-col gap-4">
            <h1 className="text-base md:text-lg font-semibold">
              Chance of rain
            </h1>
            <Charts />
          </div>

          {/* Right Side bottom Container */}
          <div className="mt-6">
            <h4 className="text-base md:text-lg font-semibold">
              Other large cities
            </h4>
            <LeftCards />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
