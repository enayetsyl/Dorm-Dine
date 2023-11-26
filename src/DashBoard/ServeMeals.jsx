
const ServeMeals = () => {
  return (
    <div>
      <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal Title</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serve Button</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* Row 1: Fake Data */}
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">Homestyle Pasta</td>
        <td className="px-6 py-4 whitespace-nowrap">john.doe@example.com</td>
        <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
        <td className="px-6 py-4 whitespace-nowrap">Pending</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Serve</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
  );
};

export default ServeMeals;