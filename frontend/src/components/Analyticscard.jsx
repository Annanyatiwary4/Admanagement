import React, { useEffect, useState } from "react";
import { Eye, MousePointerClick, Zap, ServerCrash } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

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

  const config = {
    impressions: {
      color: "teal",
      fill: "#14b8a6",
      icon: <Eye className="w-6 h-6 text-teal-600" />,
      label: "Total Impressions",
      description: "Volume of times your ads were shown",
    },
    clicks: {
      color: "indigo",
      fill: "#6366f1",
      icon: <MousePointerClick className="w-6 h-6 text-indigo-600" />,
      label: "Total Clicks",
      description: "Users who engaged and clicked the ads",
    },
    active: {
      color: "green",
      fill: "#22c55e",
      icon: <Zap className="w-6 h-6 text-green-600" />,
      label: "Active Ads",
      description: "Ads currently running",
      value: ads.filter((ad) => ad.status === "active").length,
    },
    paused: {
      color: "yellow",
      fill: "#eab308",
      icon: <ServerCrash className="w-6 h-6 text-yellow-600" />,
      label: "Paused Ads",
      description: "Ads that are paused or under review",
      value: ads.filter((ad) => ad.status !== "active").length,
    },
  };

  const { color, icon, label, description, value, fill } = config[type];
  const displayValue = value !== undefined ? value : total;

  const chartData = [{ name: label, value: displayValue, fill: fill }];

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {label}
          </CardTitle>
          <p className={`text-3xl font-extrabold text-${color}-600 mt-1`}>
            {displayValue.toLocaleString()}
          </p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>{icon}</div>
      </CardHeader>

      <CardContent className="flex items-center justify-center mt-2 relative">
        <div className="w-28 h-28 relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={10}
              data={chartData}
            >
              <RadialBar
                minAngle={15}
                background
                clockWise
                dataKey="value"
                cornerRadius={10}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* Center Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {icon}
          </div>
        </div>
      </CardContent>

      <CardDescription className="text-xs text-gray-400 mt-3 px-4 pb-3 border-t border-gray-100 pt-2 text-center">
        {description}
      </CardDescription>
    </Card>
  );
}

export default AnalyticsCard;
