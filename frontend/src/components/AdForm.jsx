import { useState, useEffect } from "react";

function AdForm({ onSubmit, editingAd }) {
  const [form, setForm] = useState({
    title: "",
    type: "banner",
    position: "header",
    code: ""
  });

  useEffect(() => {
    if (editingAd) {
      setForm(editingAd);
    }
  }, [editingAd]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", type: "banner", position: "header", code: "" });
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {editingAd ? "Edit Ad" : "Add New Ad"}
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Ad Title */}
        <input
          type="text"
          name="title"
          placeholder="Ad Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 font-semibold transition-all duration-300"
        />

        {/* Ad Type */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 font-semibold transition-all duration-300"
        >
          <option value="banner">Banner</option>
          <option value="adsense">AdSense</option>
          <option value="partner">Partner</option>
          <option value="pop">Pop</option>
        </select>

        {/* Ad Position */}
        <select
          name="position"
          value={form.position}
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 font-semibold transition-all duration-300"
        >
          <option value="header">Header</option>
          <option value="sidebar">Sidebar</option>
          <option value="footer">Footer</option>
        </select>

        {/* Ad Code */}
        <textarea
          name="code"
          placeholder="Ad Code (HTML/JS)"
          value={form.code}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 font-semibold transition-all duration-300 resize-none"
          rows={5}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          {editingAd ? "Update Ad" : "Add Ad"}
        </button>
      </form>
    </div>
  );
}

export default AdForm;
