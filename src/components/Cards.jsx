import PropTypes from 'prop-types';

export default function Cards({ cardObj, forecastData }) {
  const convertToCelsius = (kelvin) => Math.round(kelvin - 273.15);

  console.log(cardObj)
  return (
    <div className="cardContainer rounded grid grid-cols-7 mt-6">
      <ul className={`card cursor-pointer col-span-7 w-full flex gap-3 sm:flex-row flex-col` }>
        {forecastData.map((day, index) => {
            const forecastDate = new Date(day.dt * 1000);
            const dayOfWeek = forecastDate.toLocaleDateString("en-US", { weekday: 'long' });
            const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`; 
            return (
              <li
                key={index}
                className="group bg-zinc-900 rounded-lg flex justify-center items-center flex-col transition-all duration-300 hover:min-w-[12rem] hover:text-black hover:bg-blue-300"
              >
                <div className="span gap-2 w-full p-2 rounded-tr-lg rounded-tl-lg flex justify-between transition-all duration-300 group-hover:bg-blue-400">
                  <p>{dayOfWeek}</p>
                  <p className="hidden group-hover:inline">{cardObj.timeNow}</p>
                </div>
                <hr className="bg-gray-400 w-full group-hover:hidden" />
                <div className="text p-3 flex flex-col items-center transition-all duration-300 group-hover:items-start group-hover:w-full">
                  <div className="flex justify-between flex-col-reverse items-center group-hover:flex-row group-hover:justify-between group-hover:w-full">
                    <h1 className="text-2xl">{convertToCelsius(day.main.temp)}°C</h1> 
                    <img
                      src={iconUrl}
                      alt="Weather Icon"
                      className="w-[6rem] h-[6rem]"
                    />
                  </div>
                  <div className="hidden group-hover:flex flex-col mt-3 group-hover:mt-1">
                    <p>Real Feel: <span>{convertToCelsius(day.main.feels_like)}°C</span></p> 
                    <p>Sunrise: <span>{cardObj.sunRiseTime}</span></p>
                    <p>Sunset: <span>{cardObj.sunSetTime}</span></p>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

Cards.propTypes = {
  cardObj: PropTypes.shape({
    timeNow: PropTypes.string.isRequired,
    sunRiseTime: PropTypes.string.isRequired,
    sunSetTime: PropTypes.string.isRequired,
  }).isRequired,
  forecastData: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string.isRequired,
        })
      ).isRequired,
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
        feels_like: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};