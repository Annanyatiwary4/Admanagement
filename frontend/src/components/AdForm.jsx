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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{editingAd ? "Edit Ad" : "Add New Ad"}</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Ad Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="banner">Banner</option>
          <option value="adsense">AdSense</option>
          <option value="partner">Partner</option>
          <option value="pop">Pop</option>
        </select>

        <select
          name="position"
          value={form.position}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="header">Header</option>
          <option value="sidebar">Sidebar</option>
          <option value="footer">Footer</option>
        </select>

        <textarea
          name="code"
          placeholder="Ad Code (HTML/JS)"
          value={form.code}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          {editingAd ? "Update Ad" : "Add Ad"}
        </button>
      </form>
    </div>
  );
}

export default AdForm;
