import React, { useEffect, useState } from "react";

function AdList({ ads, onEdit, onDelete, onToggleStatus }) {
  const [stats, setStats] = useState({});

  // Load stats from localStorage for all ads
  useEffect(() => {
    const loadedStats = {};
    ads.forEach((ad) => {
      const data = JSON.parse(localStorage.getItem(`ad-stats-${ad.id}`));
      loadedStats[ad.id] = data || { impressions: 0, clicks: 0 };
    });
    setStats(loadedStats);
  }, [ads]);

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Ads</h2>

      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4"> Impressions</th>
              <th className="py-3 px-4"> Clicks</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {ads.map((ad) => {
              const adStats = stats[ad.id] || { impressions: 0, clicks: 0 };
              return (
                <tr
                  key={ad.id}
                  className="bg-white/70 backdrop-blur-sm border-b border-white/30 hover:bg-white/80 transition-all duration-300"
                >
                  <td className="py-3 px-4 font-semibold text-gray-800">{ad.id}</td>
                  <td className="py-3 px-4 text-gray-700">{ad.title}</td>
                  <td className="py-3 px-4 text-gray-700">{ad.type}</td>
                  <td className="py-3 px-4 text-gray-700">{ad.position}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800">{ad.status}</td>

                  {/* Stats */}
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    {adStats.impressions}
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    {adStats.clicks}
                  </td>

                  {/* Action buttons */}
                  <td className="py-3 px-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => onEdit(ad)}
                      className="px-4 py-1.5 rounded-xl font-semibold bg-blue-400 hover:bg-blue-500 text-white transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(ad.id)}
                      className="px-4 py-1.5 rounded-md font-semibold bg-blue-500 hover:bg-blue-400 text-white transition-colors duration-300"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => onToggleStatus(ad)}
                      className={`px-4 py-1.5 rounded-2xl font-semibold text-white transition-colors duration-300 ${
                        ad.status === "active"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-500 hover:bg-gray-600"
                      }`}
                    >
                      {ad.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdList;
