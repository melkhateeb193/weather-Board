import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function Charts() {


  const data = [
    {
      time: "2024-12-22 12:00:00",
      rain: 2.5,
      pop: 80
    },
    {
      time: "2024-12-22 15:00:00",
      rain: 1.2,
      pop: 60
    },
    {
      time: "2024-12-22 18:00:00",
      rain: 0.0,
      pop: 30
    },
    {
      time: "2024-12-22 21:00:00",
      rain: 3.0,
      pop: 90
    },
    {
      time: "2024-12-23 00:00:00",
      rain: 0.5,
      pop: 50
    }
  ];
  return (
    <div className=' flex justify-center mt-4'>
      <div>
      <BarChart width={250} height={200} data={data}>
          <CartesianGrid horizontal={true} strokeDasharray="5 5"  vertical={false} />
          {/* Display time on the X axis */}
          <XAxis dataKey="time" stroke="#8884d8" strokeOpacity={0}  tick={{ transform: 'translate(10, 0)' }} />
          <YAxis strokeOpacity={0} />
          
          {/* Rain Volume (mm) */}
          <Bar dataKey="rain" fill="#8884d8" barSize={10} name="Rain Volume (mm)"  />
          {/* Probability of Rain (%) */}
          <Bar dataKey="pop" fill="#ff7300" barSize={10} name="Probability of Rain (%)" />
        </BarChart>
      </div>
    </div>
  )
}
