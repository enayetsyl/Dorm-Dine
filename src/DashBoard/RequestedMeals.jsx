
const RequestedMeals = () => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal Title</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Likes</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Reviews</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancel Button</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* <!-- Row 1: Fake Data --> */}
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">Delicious Pizza</td>
        <td className="px-6 py-4 whitespace-nowrap">120</td>
        <td className="px-6 py-4 whitespace-nowrap">85</td>
        <td className="px-6 py-4 whitespace-nowrap">Active</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="text-indigo-600 hover:text-indigo-900">Cancel</button>
        </td>
      </tr>

      {/* <!-- Row 2: Fake Data --> */}
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">Healthy Salad</td>
        <td className="px-6 py-4 whitespace-nowrap">90</td>
        <td className="px-6 py-4 whitespace-nowrap">50</td>
        <td className="px-6 py-4 whitespace-nowrap">Pending</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="text-indigo-600 hover:text-indigo-900">Cancel</button>
        </td>
      </tr>

      {/* <!-- Row 3: Fake Data --> */}
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">Sushi Delight</td>
        <td className="px-6 py-4 whitespace-nowrap">150</td>
        <td className="px-6 py-4 whitespace-nowrap">120</td>
        <td className="px-6 py-4 whitespace-nowrap">Completed</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="text-indigo-600 hover:text-indigo-900">Cancel</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
  );
};

export default RequestedMeals;