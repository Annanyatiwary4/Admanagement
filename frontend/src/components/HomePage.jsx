import { useEffect, useState } from "react";
import { getAds } from "../api/Api";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ToolsGrid from "../components/ToolsGrid";
import PricingPlans from "../components/PricingPlans";
import Footer from "../components/Footer";
import Ad from "../components/Ad";

function HomePage() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getAds();
        setAds(res.data); // Keep all ads
      } catch (err) {
        console.error(err);
      }
    };
    fetchAds();
  }, []);

  // Separate ads by position
  const headerAds = ads.filter(ad => ad.position === "header" && ad.status === "active");
  const footerAds = ads.filter(ad => ad.position === "footer" && ad.status === "active");

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />






      {/* Tools Grid */}
      <ToolsGrid />

      {/* Pricing Plans */}
      <PricingPlans />

      {/* Footer Ads as popups */}
      <Footer ads={footerAds} />
    </div>
  );
}

export default HomePage;
