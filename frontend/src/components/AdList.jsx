import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // <-- Import ShadCN Badge

function AdList({ ads, onEdit, onDelete, onToggleStatus, onAddClick }) {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const loadedStats = {};
    ads.forEach((ad) => {
      const data = JSON.parse(localStorage.getItem(`ad-stats-${ad.id}`));
      loadedStats[ad.id] = data || { impressions: 0, clicks: 0 };
    });
    setStats(loadedStats);
  }, [ads]);

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Ads</h2>

      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Impressions</th>
              <th className="py-3 px-4">Clicks</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {ads.map((ad) => {
              const adStats = stats[ad.id] || { impressions: 0, clicks: 0 };
              const isActive = ad.status === "active";

              return (
                <tr key={ad.id} className="bg-white/70 backdrop-blur-sm border-b border-white/30 hover:bg-white/80 transition-all duration-300">
                  <td className="py-3 px-4 font-semibold text-gray-800">{ad.id}</td>
                  <td className="py-3 px-4 text-gray-700">{ad.title}</td>
                  <td className="py-3 px-4 text-gray-700">{ad.type}</td>
                  <td className="py-3 px-4 text-gray-700">{ad.position}</td>
                  
                  {/* Status Badge */}
                  <td className="py-3 px-4">
  <Badge className={isActive ? "bg-green-500 text-white" : "bg-gray-400 text-white"}>
    {isActive ? "Active" : "Inactive"}
  </Badge>
</td>


                  <td className="py-3 px-4 text-gray-700 font-medium">{adStats.impressions}</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">{adStats.clicks}</td>

                  {/* Dropdown for actions */}
                  <td className="py-3 px-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-gray-100">
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => onEdit(ad)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onToggleStatus(ad)}>
                          {isActive ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => onDelete(ad.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}

            {/* Add New Ad row */}
            <tr>
              <td colSpan="8" className="py-4 px-4 text-center">
                <Button onClick={onAddClick} variant="outline" className="flex items-center justify-center gap-2 mx-auto">
                  + Add New Ad
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdList;
