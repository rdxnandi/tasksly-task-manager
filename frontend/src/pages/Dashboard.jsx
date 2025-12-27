import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Clock9, CircleCheck, ClipboardList, ChartPie } from "lucide-react";
import {
  Layout,
  NotificationSnackbar,
  RecentActivities,
  UpcomingDeadline,
} from "../components";
import { useTaskStore } from "../store/useTaskStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

function Dashboard() {
  const [date, setDate] = useState(dayjs());

  const { userTasks, getTaskByUserId } = useTaskStore();
  const { authUser } = useAuthStore();

  const taskStatusData = [
    {
      name: "Completed",
      value: userTasks.filter((task) => task.status === "Completed").length,
      color: "#7bf1a8",
    },
    {
      name: "Pending",
      value: userTasks.filter((task) => task.status === "Pending").length,
      color: "#05df72",
    },
  ];

  const upcomingDeadline = [
    { title: "Deploy Project", description: "Due in 2 days" },
    { title: "Client Presentation", description: "Due in 5 days" },
  ];

  useEffect(() => {
    if (authUser?.data?._id) {
      getTaskByUserId(authUser.data._id);
    }
  }, [authUser, getTaskByUserId]);

  // console.log(userTasks.filter((task) => task.status === "Completed").length);

  return (
    <Layout>
      {/* Dashboard Overview */}
      <div className="flex lg:flex-row flex-col gap-5 lg:h-[300px] mt-7 lg:mt-0 md:flex-row">
        <div className="grid grid-cols-1 gap-4 lg:w-[42%] md:w-[42%] lg:h-full">
          <div className="p-3 rounded-2xl bg-white flex items-center gap-6">
            <ClipboardList size={20} className="text-gray-500" />
            <div>
              <h3 className="text-gray-600 font-bold text-lg">
                {userTasks.length}
              </h3>
              <p>Total Tasks</p>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-white flex items-center gap-6">
            <CircleCheck size={20} className="text-gray-500" />
            <div>
              <h3 className="text-gray-600 font-bold text-lg">
                {userTasks.filter((task) => task.status === "Completed").length}
              </h3>
              <p>Completed Tasks</p>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-white flex items-center gap-6">
            <Clock9 size={20} className="text-gray-500" />
            <div>
              <h3 className="text-gray-600 font-bold text-lg">
                {userTasks.filter((task) => task.status === "Pending").length}
              </h3>
              <p>Pending Tasks</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        {/* <RecentActivities /> */}
      </div>

      <div className="flex gap-4 w-full flex-col lg:flex-row mt-6">
        {/* Statistic */}
        <div className="p-4 bg-white lg:w-1/2 w-full rounded-2xl">
          <div className="flex gap-3 items-center">
            <ChartPie size={20} />
            <h3 className="text-lg font-semibold">Task Statistic</h3>
          </div>
          <div className="mt-4 h-64">
            <PieChart width={250} height={250}>
              <Pie
                data={taskStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <ul className="mt-2 text-sm">
            {taskStatusData.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span style={{ color: item.color }} className="font-semibold">
                  {item.name}
                </span>
                <span className="font-bold" style={{ color: item.color }}>
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Calendar Integration using MUI */}
        <div className="p-4 bg-white rounded-2xl lg:w-[30%] w-full flex items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={date}
              onChange={(newDate) => setDate(newDate)}
              sx={{
                "& .Mui-selected": {
                  backgroundColor: "#05df72 !important",
                  color: "white !important",
                  border: "2px solid #00c950",
                },
                "& .Mui-selected:hover": {
                  backgroundColor: "#7bf1a8 !important",
                },
              }}
            />
          </LocalizationProvider>
        </div>

        <div className="flex gap-5 lg:w-[70%] w-full">
          {/* Upcoming Deadlines */}
          <UpcomingDeadline activities={upcomingDeadline} />
        </div>
      </div>

      <div>
        {/* {tasks.map((task) => (
          <NotificationSnackbar key={task.id} task={task} />
        ))} */}
      </div>
    </Layout>
  );
}

export default Dashboard;
