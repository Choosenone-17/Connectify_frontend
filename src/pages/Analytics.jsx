import Layout from "../components/Layout";

export default function Analytics() {
  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Analytics Overview
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <StatCard title="Total Deals" value="24" />
        <StatCard title="Revenue Generated" value="₹1,45,000" />
        <StatCard title="Profile Views" value="3,240" />

      </div>
    </Layout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl">
      <h3 className="text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className="text-3xl font-bold mt-4 dark:text-white">
        {value}
      </p>
    </div>
  );
}