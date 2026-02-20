import { deals } from "../utils/deals";

export default function BrandFeed() {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">Send Deal Requests</h2>

      {deals.map(deal => (
        <div key={deal.id} className="bg-black/40 p-4 rounded-xl mb-4">
          <p className="font-bold">{deal.influencer}</p>
          <p>Offer: ₹{deal.budget}</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 rounded-lg">
            Send Deal
          </button>
        </div>
      ))}
    </div>
  );
}
