function UpcomingDeadline({ activities }) {
  return (
    <div className="p-4 bg-white rounded-2xl w-full">
      <h1 className="text-lg font-bold">Upcoming Deadlines</h1>
      <ul className="mt-2 text-gray-600">
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingDeadline;
