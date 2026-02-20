import Layout from "../components/Layout";

export default function DealsHistory() {
  const deals = [
    { name: "Foodie Rahul", amount: "₹5,000", status: "Completed" },
    { name: "City Bites", amount: "₹3,500", status: "Pending" },
  ];

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Deals History
      </h2>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <th className="p-3">Influencer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-gray-800">
                <td className="p-3 dark:text-white">{deal.name}</td>
                <td className="p-3 dark:text-white">{deal.amount}</td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full bg-green-500 text-white text-sm">
                    {deal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}