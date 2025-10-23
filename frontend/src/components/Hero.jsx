function Hero() {
  return (
    <section className="bg-blue-50 text-black text-center py-20">
      <h1 className="text-5xl font-bold mb-4">All-in-One Online Tools Platform</h1>
      <p className="text-2xl mb-8">
        Download videos, convert files, check internet speed, and access 12+ powerful tools. Fast, secure, and free to use.
      </p>
      <div className="flex justify-center gap-6">
        <button className="bg-blue-400 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-500 transition">
          Explore Tools
        </button>
        <button className="bg-white text-blue-600 py-3 px-8 rounded-full font-semibold hover:bg-gray-100 transition">
          View Pricing
        </button>
      </div>
    </section>
  );
}

export default Hero;
