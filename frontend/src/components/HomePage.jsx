import { useEffect, useState } from "react";
import { getAds } from "../api/Api";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ToolsGrid from "../components/ToolsGrid";
import PricingPlans from "../components/PricingPlans";
import Footer from "../components/Footer";

function HomePage() {
  const [ads, setAds] = useState([]);

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

  const headerAds = ads.filter(ad => ad.position === "header");
  const footerAds = ads.filter(ad => ad.position === "footer");

  return (
    <div>
      <Header ads={headerAds} />
      <Hero />
      <ToolsGrid />
      <PricingPlans />
      <Footer ads={footerAds} />
    </div>
  );
}

export default HomePage;
