import { useState, useEffect } from "react";
import { getAds, addAd, editAd, deleteAd, toggleAdStatus } from "../api/Api";
import Header from "./Header";
import AdList from "./AdList";
import AnalyticsCard from "./AnalyticsCard";
import AdForm from "./AdForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";

function AdminPanel({ admin }) {
  const [ads, setAds] = useState([]);
  const [editingAd, setEditingAd] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, adId: null });
  const navigate = useNavigate();

  const fetchAds = async () => {
    try {
      const res = await getAds();
      setAds(res.data);
    } catch (err) {
      console.error("Error fetching ads", err);
      showMessage("Error fetching ads", "error");
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmitAd = async (data) => {
    try {
      if (editingAd) {
        await editAd({ ...data, id: editingAd.id });
        showMessage("Ad updated successfully", "success");
      } else {
        await addAd(data);
        showMessage("Ad added successfully", "success");
      }
      setEditingAd(null);
      setOpenModal(false);
      fetchAds();
    } catch (err) {
      console.error(err);
      showMessage("Error saving ad", "error");
    }
  };

  const handleDelete = async (id) => {
    await deleteAd(id);
    fetchAds();
    showMessage("Ad deleted successfully", "success");
    setDeleteConfirm({ open: false, adId: null });
  };

  const handleToggleStatus = async (ad) => {
    const newStatus = ad.status === "active" ? "inactive" : "active";
    await toggleAdStatus(ad.id, newStatus);
    fetchAds();
    showMessage(`Ad ${newStatus === "active" ? "activated" : "deactivated"}`, "warning");
  };

  const handleLogout = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 relative">
      <Header ads={[]} user={admin} onLogout={handleLogout} />

      <div className="p-6 mt-6 space-y-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Admin Panel</h1>

        {/* Analytics */}
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 text-center mb-10">
            Analytics Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnalyticsCard ads={ads} type="impressions" />
            <AnalyticsCard ads={ads} type="clicks" />
            <AnalyticsCard ads={ads} type="active" />
            <AnalyticsCard ads={ads} type="paused" />
          </div>
        </div>

        {/* Ad List */}
        <AdList
          ads={ads}
          onEdit={(ad) => { setEditingAd(ad); setOpenModal(true); }}
          onDelete={(id) => setDeleteConfirm({ open: true, adId: id })}
          onToggleStatus={handleToggleStatus}
          onAddClick={() => { setEditingAd(null); setOpenModal(true); }}
        />

        {/* Modal for Add/Edit */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingAd ? "Edit Ad" : "Add New Ad"}</DialogTitle>
            </DialogHeader>
            <AdForm editingAd={editingAd} onSubmit={handleSubmitAd} />
          </DialogContent>
        </Dialog>

        {/* Centered Animated Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="pointer-events-auto bg-white rounded-2xl shadow-2xl px-6 py-6 flex items-center gap-4 min-w-[300px] max-w-sm">
                {messageType === "error" ? (
                  <XCircle className="w-6 h-6 text-red-600" />
                ) : messageType === "warning" ? (
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                )}
                <p className="font-semibold text-gray-800 text-center">{message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Delete Confirmation */}
        <AnimatePresence>
          {deleteConfirm.open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 pointer-events-auto"
            >
              <div className="bg-white rounded-2xl shadow-2xl px-6 py-6 flex flex-col gap-4 min-w-[300px] max-w-sm">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  <p className="font-semibold text-gray-800 text-lg">Are you sure you want to delete this ad?</p>
                </div>
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                    onClick={() => setDeleteConfirm({ open: false, adId: null })}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                    onClick={() => handleDelete(deleteConfirm.adId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default AdminPanel;
