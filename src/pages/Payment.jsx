export default function Payment() {
  return (
    <div className="h-screen flex items-center justify-center text-white">
      <div className="bg-black/40 p-10 rounded-2xl text-center">
        <h2 className="text-2xl mb-4">Secure Payment</h2>
        <p>Amount held by Connectify</p>

        <button className="mt-6 px-6 py-3 bg-green-500 rounded-xl">
          Pay Now
        </button>
      </div>
    </div>
  );
}
