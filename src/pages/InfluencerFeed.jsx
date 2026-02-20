import { deals } from "../utils/deals";

export default function InfluencerFeed() {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">Incoming Deals</h2>

      {deals.map(deal => (
        <div key={deal.id} className="bg-black/40 p-4 rounded-xl mb-4">
          <p className="font-bold">{deal.brand}</p>
          <p>Budget: ₹{deal.budget}</p>
          <p>Status: {deal.status}</p>

          <button className="mt-2 px-4 py-2 bg-green-500 rounded-lg">
            Accept
          </button>
        </div>
      ))}
    </div>
  );
}
