import React, { useState, useEffect } from "react";
import Ad from "./Ad";

function Footer({ ads }) {
  // Filter footer ads
  const footerAds = ads;

  // Track which ads are closed
  const [visibleAds, setVisibleAds] = useState([]);

  useEffect(() => {
    setVisibleAds(footerAds.map((ad) => ad.id));
  }, [footerAds]);

  const handleClose = (id) => {
    setVisibleAds((prev) => prev.filter((adId) => adId !== id));
  };

  return (
    <>
      {/* Footer itself */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-gray-100 text-sm">
            © 2025 TheToolX. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Footer Ads as popups in bottom-right */}
      {footerAds.map(
        (ad) =>
          visibleAds.includes(ad.id) && (
            <div
              key={ad.id}
              className="fixed bottom-4 right-8 z-50 flex items-start space-x-2"
            >
              {/* Ad content */}
              <Ad ad={ad} />

              {/* Close button */}
              <button
                onClick={() => handleClose(ad.id)}
                className="text-gray-500 hover:text-gray-800 font-bold text-lg ml-2"
              >
                ×
              </button>
            </div>
          )
      )}
    </>
  );
}

export default Footer;
