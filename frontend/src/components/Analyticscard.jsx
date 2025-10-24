import React, { useEffect, useState } from "react";
import { Eye, MousePointerClick, Zap, ServerCrash } from "lucide-react";

function AnalyticsCard({ ads, type = "impressions" }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    ads.forEach((ad) => {
      const data = JSON.parse(localStorage.getItem(`ad-stats-${ad.id}`));
      const adData = data || { impressions: 0, clicks: 0 };
      sum += type === "impressions" ? adData.impressions : adData.clicks;
    });
    setTotal(sum);
  }, [ads, type]);

  // Map type to colors and icon
  const config = {
    impressions: {
      color: "teal",
      icon: <Eye className="w-6 h-6 text-teal-600" />,
      label: "Total Impressions",
      description: "Volume of times your ads were shown",
    },
    clicks: {
      color: "indigo",
      icon: <MousePointerClick className="w-6 h-6 text-indigo-600" />,
      label: "Total Clicks",
      description: "Users who engaged and clicked the ads",
    },
    active: {
      color: "green",
      icon: <Zap className="w-6 h-6 text-green-600" />,
      label: "Active Ads",
      description: "Ads currently running",
      value: ads.filter((ad) => ad.status === "active").length,
    },
    paused: {
      color: "yellow",
      icon: <ServerCrash className="w-6 h-6 text-yellow-600" />,
      label: "Paused Ads",
      description: "Ads that are paused or under review",
      value: ads.filter((ad) => ad.status !== "active").length,
    },
  };

  const { color, icon, label, description, value } = config[type];

  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-5 shadow-md flex flex-col justify-between`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {label}
          </p>
          <p className={`text-3xl font-extrabold text-${color}-600 mt-1`}>
            {value !== undefined ? value : total}
          </p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          {icon}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4 pt-2 border-t border-gray-100">
        {description}
      </p>
    </div>
  );
}

export default AnalyticsCard;
