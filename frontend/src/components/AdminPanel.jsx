import { useState, useEffect } from "react";
import { Eye, MousePointerClick, Zap, ServerCrash } from "lucide-react";
import { getAds, addAd, editAd, deleteAd, toggleAdStatus } from "../api/Api";
import Header from "./Header";
import AdForm from "./AdForm";
import AdList from "./AdList";
import AnalyticsCard from "./AnalyticsCard";
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      await deleteAd(id);
      fetchAds();
    }
  };

  const handleToggleStatus = async (ad) => {
    const newStatus = ad.status === "active" ? "inactive" : "active";
    await toggleAdStatus(ad.id, newStatus);
    fetchAds();
  };

  const handleLogout = () => {
    console.log("Admin logged out");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50">
      {/* Header */}
      <Header
        ads={ads.filter((ad) => ad.position === "header" && ad.status === "active")}
        user={admin}
        onLogout={handleLogout}
      />

      <div className="p-6 mt-6 space-y-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Admin Panel</h1>

        {/* Top Section: AdForm + Analytics */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: AdForm */}
          <div className="flex-1 bg-white/50 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <AdForm onSubmit={handleSubmitAd} editingAd={editingAd} />
          </div>

          {/* Right: Analytics (Premium Dashboard Style) */}
          <div className="flex-1 bg-white backdrop-blur-md border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-6 hover:scale-[1.02] transition-transform duration-500">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-6">
              Analytics Overview
            </h2>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <AnalyticsCard ads={ads} type="impressions" />
              <AnalyticsCard ads={ads} type="clicks" />
              <AnalyticsCard ads={ads} type="active" />
              <AnalyticsCard ads={ads} type="paused" />
            </div>
          </div>
        </div>

        {/* Success/Error message */}
        {message && (
          <p className="mb-4 text-green-600 font-semibold animate-pulse">{message}</p>
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
