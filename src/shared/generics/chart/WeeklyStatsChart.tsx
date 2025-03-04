import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

interface props {
  title: string,
  data: { name: string, value: number }[]
}

const WeeklyStatsChart = ({title, data}: props) => {
  return (
    <div className="h-[200px] w-full border rounded-2xl border-borderColor flex flex-col justify-between px-4 py-3 gap-y-2">
      <div className="flex items-center justify-end">
        <div className="text-sm rounded-2xl px-3 py-2 bg-grey3 text-grey4">
          {title}
        </div>
      </div>
      <div className='h-[150px] w-full'>
        <ResponsiveContainer width="100%" height="100%" className="">
          <BarChart data={data} margin={{ left: 0 }}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              width={0}
              axisLine={false}
              tickLine={false}
              tick={false}
            />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#FB7C37"
              radius={4}
              barSize={35}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyStatsChart;
