import { useEffect, useState } from "react";
import { getAds } from "../api/Api";
import Ad from "./Ad";

function Hero() {
  const [headerAds, setHeaderAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getAds();
        // filter for "header" ads instead of "footer"
        setHeaderAds(
          res.data.filter((ad) => ad.position === "header" && ad.status === "active")
        );
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };
    fetchAds();
  }, []);

  return (
    <section className="bg-blue-50 text-black text-center py-20">
      <h1 className="text-5xl font-bold mb-4">All-in-One Online Tools Platform</h1>
      <p className="text-2xl mb-8 max-w-3xl mx-auto text-gray-700">
        Download videos, convert files, check internet speed, and access 12+ powerful tools.
        Fast, secure, and free to use.
      </p>

      <div className="flex justify-center gap-6 mb-10">
        <button className="bg-blue-400 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-500 transition">
          Explore Tools
        </button>
        <button className="bg-white text-blue-600 py-3 px-8 rounded-full font-semibold hover:bg-gray-100 transition">
          View Pricing
        </button>
      </div>

      {/* Show header/banner ads as banner below buttons */}
      <div className="container mx-auto px-4 mt-8 flex justify-center">
        {headerAds.length > 0 ? (
          <div className="w-full md:w-10/12 lg:w-8/12">
            {headerAds.map((ad) => (
              <Ad key={ad.id} ad={ad} />
            ))}
          </div>
        ) : (
          <div className="w-full md:w-10/12 lg:w-8/12 rounded-lg py-8 text-gray-500 italic">
            {/* Optional placeholder */}
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
