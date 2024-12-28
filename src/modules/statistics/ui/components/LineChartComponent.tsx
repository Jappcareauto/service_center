import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';



const data = [
  { year: '2021', revenue: 1000 },
  { year: '2022', revenue: 18000 },
  { year: '2023', revenue: 17500 },
  { year: '2024', revenue: 25000 },
];

const CustomTooltip = ({ active, payload }: { active: boolean, payload: { value: string }[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <p className="text-sm text-gray-600">{`${payload[0].value.toLocaleString()} Frs`}</p>
      </div>
    );
  }
  return null;
};

const LineChartComponent = () => {
  return (
    <div className="w-full p-6 space-y-4 border border-borderColor rounded-3xl my-6">
      <div className="space-y-1">
        <div className="text-gray-500 text-sm">Total Revenue</div>
        <div className="text-2xl font-bold">28,000 Frs</div>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FED7D7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FED7D7" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8' }}
              tickFormatter={(value) => `${value.toLocaleString()} Frs`}
            />
            <Tooltip content={(v) => {
              console.log(v);

              return <CustomTooltip active={true} payload={[]} />;
            }} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#ff7e5f"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 8, fill: "#ff7e5f" }}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChartComponent
