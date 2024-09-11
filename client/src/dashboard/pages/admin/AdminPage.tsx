import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useCurrentUserQuery } from "../../../features/users/api/userSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "rgb(75, 192, 192)",
    },
    // {
    //   label: "Sales",
    //   data: [70, 80, 40, 50, 43, 23, 55],
    //   borderColor: "rgb(188, 192, 75)",
    // },
  ],
};

// Options for the chart
const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Sales Overview",
    },
    // tooltip: {
    //   callbacks: {
    //     label: function (tooltipItem) {
    //       return `Value: ${tooltipItem.raw}`;
    //     },
    //   },
    // },
  },
};

function AdminPage() {
  const { data: currentUser } = useCurrentUserQuery();

  return (
    <>
      {currentUser?.user?.role === "admin" ? (
        <div className="p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-secbgDark800  shadow-md rounded-lg p-4 flex items-center justify-between">
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  200
                </span>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Users
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-secbgDark800  shadow-md rounded-lg p-4 flex items-center justify-between">
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  1000
                </span>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Orders
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-secbgDark800  shadow-md rounded-lg p-4 flex items-center justify-between">
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  500
                </span>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Sellers
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white  dark:bg-secbgDark800 shadow-md h-[600px] rounded-lg p-1 md:p-6">
            {/* <h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">
            Sales Overview
          </h2> */}
            <Line data={data} options={options} />
          </div>
        </div>
      ) : (
        <div className="bg-white  dark:bg-secbgDark800 shadow-md h-[600px] rounded-lg p-1 md:p-6">
          <Line data={data} options={options} />
        </div>
      )}
    </>
  );
}

export default AdminPage;
