function AdList({ ads, onEdit, onDelete, onToggleStatus }) {
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
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr
                key={ad.id}
                className="bg-white/70 backdrop-blur-sm border-b border-white/30 hover:bg-white/80 transition-all duration-300"
              >
                <td className="py-3 px-4 font-semibold text-gray-800">{ad.id}</td>
                <td className="py-3 px-4 text-gray-700">{ad.title}</td>
                <td className="py-3 px-4 text-gray-700">{ad.type}</td>
                <td className="py-3 px-4 text-gray-700">{ad.position}</td>
                <td className="py-3 px-4 font-semibold text-gray-800">{ad.status}</td>
                <td className="py-3 px-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => onEdit(ad)}
                    className="px-3 py-1 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-500 text-white transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(ad.id)}
                    className="px-3 py-1 rounded-xl font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onToggleStatus(ad)}
                    className={`px-3 py-1 rounded-xl font-semibold text-white transition-colors duration-300 ${
                      ad.status === "active"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-500 hover:bg-gray-600"
                    }`}
                  >
                    {ad.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdList;
