import { useEffect, useState } from "react";
import { getAds } from "../api/Api";
import Ad from "./Ad";
import {
  FaRegClock,
  FaDownload,
  FaFilePdf,
  FaMusic,
  FaImage,
  FaLink,
  FaLanguage,
  FaTiktok,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function ToolsGrid() {
  const [headerAds, setHeaderAds] = useState([]);
  const [sidebarAds, setSidebarAds] = useState([]);
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getAds();
        setAds(res.data.filter((ad) => ad.status === "active"));
        setHeaderAds(res.data.filter((ad) => ad.position === "header" && ad.status === "active"));
        setSidebarAds(res.data.filter((ad) => ad.position === "sidebar" && ad.status === "active"));
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
    <div>

      <div className="bg-gray-50 min-h-screen flex flex-col items-center">
        {/* Centered layout same as TwitterDownloader */}
        <div className="flex justify-center w-full mt-6 px-4 md:px-6 lg:px-0 max-w-[1400px] gap-6">
          
          {/* Left Sidebar Ads */}
          <aside className="hidden lg:block lg:w-2/12 p-4 space-y-6 sticky top-6 h-[calc(100vh-1.5rem)] overflow-auto">
            {sidebarAds.map((ad) => (
              <Ad key={ad.id} ad={ad} />
            ))}
          </aside>

          {/* Main content (Tools Grid) */}
          <main className="w-full lg:w-8/12">
            <section className="py-10">
              <h2 className="text-3xl font-bold text-center mb-4">Popular Tools</h2>
              <p className="text-center text-gray-600 mb-12">
                Choose from our collection of powerful online tools
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {tools.map((tool, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-start cursor-pointer"
                    onClick={() => {
                      if (tool.name === "Twitter Video Downloader") navigate("/twitter");
                    }}
                  >
                    <div className="text-blue-600 mb-4">{tool.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                      {tool.type}
                    </span>
                  </div>
                ))}
              </div>

              {/* Optional Ads Section */}
              <div className="mt-12">
                {ads
                  .filter((ad) => ad.position === "tools")
                  .map((ad) => (
                    <Ad key={ad.id} ad={ad} />
                  ))}
              </div>
            </section>
          </main>

          {/* Right Sidebar Ads */}
          <aside className="hidden lg:block lg:w-2/12 p-4 space-y-6 sticky top-6 h-[calc(100vh-1.5rem)] overflow-auto">
            {sidebarAds.map((ad) => (
              <Ad key={ad.id} ad={ad} />
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ToolsGrid;
