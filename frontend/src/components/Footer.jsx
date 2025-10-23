

import Ad from "./Ad";

function Footer({ ads }) {
  const footerAds = ads || [];
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-gray-100">© 2025 TheToolX. All rights reserved.</p>
        <div className="flex gap-4">
          {footerAds.map(ad => (
            <Ad key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
