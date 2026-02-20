import Navbar from "../components/Navbar";
import { useContext } from "react";
import { DealContext } from "../context/DealContext";
import { useNavigate } from "react-router-dom";

export default function DealPage() {
  const { selectedDeal, confirmDeal } = useContext(DealContext);
  const navigate = useNavigate();

  if (!selectedDeal) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center">
          <h2 className="text-2xl font-bold">No Deal Selected</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Confirm Collaboration</h2>

          <p className="mb-2 font-semibold">{selectedDeal.name}</p>

          <button
            onClick={() => {
              confirmDeal();
              navigate("/history");
            }}
            className="bg-green-600 text-white px-6 py-2 rounded mt-4"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
}