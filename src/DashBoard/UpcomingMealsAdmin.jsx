
const UpcomingMealsAdmin = () => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal Title</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Likes</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Reviews</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publish Button</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* Row 1: Fake Data */}
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">Special Sushi Platter</td>
        <td className="px-6 py-4 whitespace-nowrap">120</td>
        <td className="px-6 py-4 whitespace-nowrap">90</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Publish</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
  );
};

export default UpcomingMealsAdmin;