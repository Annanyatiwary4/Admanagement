import React, { useEffect, useState } from "react";
import { FaVideo, FaImage, FaDownload, FaTwitter } from "react-icons/fa";
import axios from "axios";

import Header from "./Header";
import Ad from "../components/Ad";

function TwitterDownloader() {
  const [headerAds, setHeaderAds] = useState([]);
  const [sidebarAds, setSidebarAds] = useState([]);
  const [url, setUrl] = useState("");
  const [type, setType] = useState("video");

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/getAds.php");
        setHeaderAds(
          res.data.filter((ad) => ad.position === "header" && ad.status === "active")
        );
        setSidebarAds(
          res.data.filter((ad) => ad.position === "sidebar" && ad.status === "active")
        );
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };
    fetchAds();
  }, []);

  const handleDownload = () => {
    if (!url) return alert("Please enter a Twitter URL.");
    console.log("Downloading:", type, url);
    alert(`Downloading ${type} from URL: ${url}`);
  };

  return (
    <div>
         <Header ads={headerAds} />
    
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Header with header ads */}
     

      {/* Content area with side margins */}
      <div className="flex justify-center w-full mt-6 px-4 md:px-6 lg:px-0 max-w-[1400px] gap-6">

        {/* Left Sidebar Ads */}
        <aside className="hidden lg:block lg:w-2/12 p-4 space-y-6 sticky top-6 h-[calc(100vh-1.5rem)] overflow-auto">
          {sidebarAds.map((ad) => (
            <Ad key={ad.id} ad={ad} />
          ))}
        </aside>

        {/* Main content */}
        <main className="w-full lg:w-8/12 space-y-8">
          {/* Twitter Glowing Icon */}
          <div className="flex justify-center mb-4">
            <FaTwitter className="w-16 h-16 text-blue-400 animate-pulse drop-shadow-[0_0_20px_#1DA1F2]" />
          </div>

          {/* Download Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Twitter Video Downloader
            </h2>
            <p className="text-gray-600 mb-4">Download Twitter videos and GIFs easily</p>

            {/* Input + Select */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 border rounded-lg p-2 items-center focus-within:ring-2 focus-within:ring-blue-400">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-2 rounded-lg border-none focus:outline-none w-full md:w-1/4"
              >
                <option value="video">Video</option>
                <option value="photos">Photos</option>
              </select>

              <input
                type="text"
                placeholder="Twitter URL (e.g. https://twitter.com/username/status/1234567890)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border-none focus:outline-none"
              />
            </div>

            {/* Download Button Below */}
            <button
              onClick={handleDownload}
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-300"
            >
              Download Content
            </button>

            <p className="text-gray-500 mt-4">
              Download Twitter videos, images, or all media from a tweet quickly.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: FaVideo, title: "Videos & GIFs", desc: "Download Twitter videos and animated GIFs in high quality." },
              { icon: FaImage, title: "Images", desc: "Save images from tweets in original resolution and quality." },
              { icon: FaDownload, title: "Bulk Download", desc: "Download all media from a tweet with a single click." },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
              >
                <card.icon className="w-12 h-12 mb-3 text-blue-500" />
                <h3 className="font-semibold text-lg mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  {card.title}
                </h3>
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* How-to Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-4">How to Download Twitter Media</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Open Twitter/X and find the tweet with media you want to download.</li>
              <li>Click on the tweet to open it in full view.</li>
              <li>Copy the tweet URL from your browser's address bar.</li>
              <li>Paste the URL into the input field above.</li>
              <li>Select media type or use auto-detect.</li>
              <li>Click "Download Media" and wait for processing.</li>
              <li>Preview and download your files when ready.</li>
            </ol>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-4">About Twitter Video Downloader</h2>
            <p className="mb-4 text-gray-700">
              Twitter is a platform where millions of users share videos daily. A Twitter Video Downloader allows you to download videos directly from Twitter in high quality without any complicated steps.
            </p>
            <p className="mb-4 text-gray-700">
              With this tool, you don't need to rely on screen recording, which often reduces video quality. Save videos instantly, preserving clarity and audio.
            </p>
          </div>
        </main>

        {/* Right Sidebar Ads */}
        <aside className="hidden lg:block lg:w-2/12 p-4 space-y-6 mt-2.5 sticky top-6 h-[calc(100vh-1.5rem)] overflow-auto">
          {sidebarAds.map((ad) => (
            <Ad key={ad.id} ad={ad} />
          ))}
        </aside>
      </div>
    </div>
    </div>
  );
}

export default TwitterDownloader;
