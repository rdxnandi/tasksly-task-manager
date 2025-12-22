import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore.js";

export default function RecentActivities() {
  const recentActivities = useTaskStore((state) => state.recentActivities);
  const deleteActivities = useTaskStore((state) => state.deleteRecentActivity);
  const tasks = useTaskStore((state) => state.tasks);

  const [visibleCount, setVisibleCount] = useState(7);
  const [showMiddleBox, setShowMiddleBox] = useState(false);

  const handleSeeMore = () => {
    setShowMiddleBox(true);
  };

  return (
    <div className="p-4 bg-white rounded-2xl w-full relative lg:h-full h-[300px]">
      <h3 className="text-lg font-bold">Recent Activities</h3>
      <ul className="mt-2 text-gray-600 flex flex-col gap-2">
        {recentActivities.slice(0, visibleCount).map((activity, index) => (
          <li key={index} className="flex justify-between">
            <span>{activity.task}</span>
            <div className="flex gap-4 items-center">
              <span>{activity.status}</span>
              <button
                onClick={() => deleteActivities(index)}
                className="w-6 h-6 flex items-center justify-center hover:bg-green-300 rounded-md cursor-pointer hover:text-white focus:outline-none"
              >
                x
              </button>
            </div>
          </li>
        ))}
      </ul>
      {recentActivities.length > 7 && (
        <button
          onClick={handleSeeMore}
          className="mt-4 text-center w-full cursor-pointer hover:underline absolute bottom-2 z-50 focus:outline-none"
        >
          See More
        </button>
      )}
      {showMiddleBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 z-[999]">
          <div className="p-6 bg-white rounded-lg shadow-lg w-[600px] overflow-y-auto">
            <ul className="text-gray-600 flex flex-col gap-2">
              {recentActivities.slice(visibleCount).map((activity, index) => (
                <li key={index} className="flex justify-between">
                  <span>{activity.task}</span>
                  <div className="flex gap-4 items-center">
                    <span>{activity.status}</span>
                    <button
                      onClick={() => deleteActivities(index)}
                      className="w-6 h-6 p-1 flex items-center justify-center hover:bg-green-300 rounded-md cursor-pointer hover:text-white focus:outline-none"
                    >
                      x
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowMiddleBox(false)}
              className="cursor-pointer w-fit mt-7 px-2 border rounded-md border-gray-600 float-right focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
