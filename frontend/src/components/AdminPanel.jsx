import { useState, useEffect } from "react";
import { getAds, addAd, editAd, deleteAd, toggleAdStatus } from "../api/Api";
import Header from "./Header"; // Import the Header
import AdForm from "./AdForm";
import AdList from "./AdList";
import { useNavigate } from "react-router-dom";


function AdminPanel({ admin }) {
  const [ads, setAds] = useState([]);
  const [editingAd, setEditingAd] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch all ads
  const fetchAds = async () => {
    try {
      const res = await getAds();
      setAds(res.data);
    } catch (err) {
      console.error("Error fetching ads", err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // Handle Add/Edit ad
  const handleSubmitAd = async (data) => {
    try {
      if (editingAd) {
        await editAd({ ...data, id: editingAd.id });
        setMessage("Ad updated successfully");
      } else {
        await addAd(data);
        setMessage("Ad added successfully");
      }
      setEditingAd(null);
      fetchAds();
    } catch (err) {
      console.error(err);
      setMessage("Error saving ad");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      await deleteAd(id);
      fetchAds();
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (ad) => {
    const newStatus = ad.status === "active" ? "inactive" : "active";
    await toggleAdStatus(ad.id, newStatus);
    fetchAds();
  };

  // Handle logout (example)
  const handleLogout = () => {
    console.log("Admin logged out");
    navigate("/home");
    // You can clear auth token or redirect here
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header ads={ads.filter(ad => ad.position === "header" && ad.status === "active")} user={admin} onLogout={handleLogout} />

      {/* Admin Panel Content */}
      <div className="p-6 mt-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Admin Panel</h1>

        {/* Ad Form */}
        <div className="mb-8">
          <AdForm onSubmit={handleSubmitAd} editingAd={editingAd} />
        </div>

        {/* Success/Error message */}
        {message && (
          <p className="mb-4 text-green-600 font-semibold">{message}</p>
        )}

        {/* Ad List */}
        <AdList
          ads={ads}
          onEdit={(ad) => setEditingAd(ad)}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
}

export default AdminPanel;
