import { useEffect, useState } from "react";
import { getAds } from "../api/Api";
import Ad from "./Ad";
import { FaRegClock, FaDownload, FaFilePdf, FaMusic, FaImage, FaLink, FaLanguage, FaTiktok, FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ToolsGrid() {
  const [ads, setAds] = useState([]);
  const navigate= useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getAds();
        setAds(res.data.filter(ad => ad.status === "active"));
      } catch (err) {
        console.error(err);
      }
    };
    fetchAds();
  }, []);

  const tools = [
    { name: "Age Calculator", description: "Calculate your exact age in years, months, days, and more. Find out interesting facts about your birth date.", type: "Free", icon: <FaRegClock size={24} /> },
    { name: "Internet Speed Test", description: "Instantly test your internet speed with our fast, accurate, and easy-to-use tool.", type: "Free", icon: <FaDownload size={24} /> },
    { name: "TikTok Video Downloader", description: "Download TikTok videos without watermark in high quality.", type: "Free", icon: <FaTiktok size={24} /> },
    { name: "Facebook Video Downloader", description: "Download Facebook videos quickly and easily in HD quality.", type: "Free", icon: <FaFacebook size={24} /> },
    { name: "Twitter Video Downloader", description: "Download Twitter videos and GIFs easily.", type: "Free", icon: <FaTwitter size={24} /> },
    { name: "YouTube Video Downloader", description: "Download YouTube videos in multiple formats and quality.", type: "Free", icon: <FaYoutube size={24} /> },
    { name: "Instagram Video Downloader", description: "Download Instagram videos, reels, and stories.", type: "Free", icon: <FaInstagram size={24} /> },
    { name: "PDF to Word Converter", description: "Convert PDF files to Word documents quickly.", type: "Free", icon: <FaFilePdf size={24} /> },
    { name: "YouTube to MP3 Converter", description: "Convert YouTube videos to MP3 audio files.", type: "Free", icon: <FaMusic size={24} /> },
    { name: "Image Background Remover", description: "Remove background from images automatically.", type: "Free", icon: <FaImage size={24} /> },
    { name: "URL Shortener", description: "Shorten long URLs and track clicks.", type: "Free", icon: <FaLink size={24} /> },
    { name: "Language Translator", description: "Translate text between multiple languages.", type: "Free", icon: <FaLanguage size={24} /> },
  ];

  return (
    <section className="py-16 container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">Popular Tools</h2>
      <p className="text-center text-gray-600 mb-12">Choose from our collection of powerful online tools</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 cursor-pointer lg:grid-cols-4 gap-8">
        {tools.map((tool, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col items-start"
          onClick={() => {
                     if (tool.name === "Twitter Video Downloader") navigate("/twitter");
                    // Add other navigation if needed
                     }}>
            <div className="text-blue-600 mb-4">{tool.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded">{tool.type}</span>
          </div>
        ))}
      </div>

      {/* Optional Ads Section */}
      <div className="mt-12">
        {ads.filter(ad => ad.position === "tools").map(ad => (
          <Ad key={ad.id} ad={ad} />
        ))}
      </div>
    </section>
  );
}

export default ToolsGrid;
