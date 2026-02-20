import Navbar from "../components/Navbar";

export default function Subscription() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-10">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Choose Your Plan
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-xl font-bold mb-4">Basic</h3>
            <p className="text-3xl font-bold mb-6">₹999 / month</p>
            <p className="mb-6">Limited collaborations</p>
            <button className="bg-black text-white px-6 py-2 rounded">
              Subscribe
            </button>
          </div>

          <div className="bg-black text-white p-8 rounded-2xl shadow text-center scale-105">
            <h3 className="text-xl font-bold mb-4">Pro</h3>
            <p className="text-3xl font-bold mb-6">₹1999 / month</p>
            <p className="mb-6">Unlimited collaborations</p>
            <button className="bg-pink-600 px-6 py-2 rounded">
              Subscribe
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-xl font-bold mb-4">Enterprise</h3>
            <p className="text-3xl font-bold mb-6">Custom Pricing</p>
            <p className="mb-6">For large companies</p>
            <button className="bg-black text-white px-6 py-2 rounded">
              Contact Us
            </button>
          </div>

        </div>
      </div>
    </>
  );
}