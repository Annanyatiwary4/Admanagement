function AdList({ ads, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">All Ads</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Position</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <tr key={ad.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{ad.id}</td>
              <td className="py-2 px-4 border-b">{ad.title}</td>
              <td className="py-2 px-4 border-b">{ad.type}</td>
              <td className="py-2 px-4 border-b">{ad.position}</td>
              <td className="py-2 px-4 border-b">{ad.status}</td>
              <td className="py-2 px-4 border-b space-x-2">
                <button
                  onClick={() => onEdit(ad)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(ad.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => onToggleStatus(ad)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  {ad.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdList;
