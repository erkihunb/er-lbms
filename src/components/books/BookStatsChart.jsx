import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { getBookStatsByGenre } from "../../api/books";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BookStatsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Books per Genre",
        data: [],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getBookStatsByGenre();
        setChartData({
          labels: data.stats.map((genre) => genre._id),
          datasets: [
            {
              label: "Books per Genre",
              data: data.stats.map((genre) => genre.count),
              backgroundColor: "rgba(59, 130, 246, 0.5)",
            },
          ],
        });
      } catch (err) {
        console.error("Failed to fetch genre stats:", err);
      }
    };
    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Books Distribution by Genre",
      },
    },
  };

  return <Bar options={options} data={chartData} />;
};

export default BookStatsChart;
