import PropTypes from 'prop-types';

export default function LeftSIde({ filterByDay }) {
  return (
    <div className="top flex justify-between sm:flex-row flex-col sm:items-start items-center gap-3 ">
      <div className="flex gap-5">
        <p onClick={() => filterByDay("today")} className="cursor-pointer hover:bg-blue-300 rounded-full p-2">
          Today
        </p>
        <p onClick={() => filterByDay("tomorrow")} className="cursor-pointer hover:bg-blue-300 rounded-full p-2">
          Tomorrow
        </p>
        <p onClick={() => filterByDay("nextSevenDays")} className="cursor-pointer hover:bg-blue-300 rounded-full p-2">
          Next 7 Days
        </p>
      </div>
    </div>
  );
}

LeftSIde.propTypes = {
  filterByDay: PropTypes.func.isRequired, 
};