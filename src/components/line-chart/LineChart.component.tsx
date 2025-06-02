/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Revenue",
        data: [22000, 18000, 25000, 28000],
        fill: true,
        borderColor: "#FF7E5F",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(255, 126, 95, 0.4)");
          gradient.addColorStop(0.5, "rgba(255, 126, 95, 0.1)");
          gradient.addColorStop(1, "rgba(255, 126, 95, 0.05)");
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          callback: () => ``,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#666",
        bodyColor: "#666",
        bodyFont: {
          size: 13,
        },
        titleFont: {
          size: 13,
        },
        padding: 12,
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: (context: any) => `${context.parsed.y.toLocaleString()} Frs`,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
