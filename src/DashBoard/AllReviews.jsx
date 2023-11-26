
const AllReviews = () => {
  return (
    <div>
      <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal Title</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Likes</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Reviews</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* Row 1: Fake Data */}
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">Spicy Tacos</td>
        <td className="px-6 py-4 whitespace-nowrap">110</td>
        <td className="px-6 py-4 whitespace-nowrap">90</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
  );
};

export default AllReviews;