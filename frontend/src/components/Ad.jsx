import { useEffect } from "react";

function Ad({ ad }) {
  useEffect(() => {
    // Increment impressions on mount
    const key = `ad-stats-${ad.id}`;
    const data = JSON.parse(localStorage.getItem(key)) || { impressions: 0, clicks: 0 };
    data.impressions += 1;
    localStorage.setItem(key, JSON.stringify(data));
  }, [ad.id]);

  const handleClick = () => {
    // Increment clicks on click
    const key = `ad-stats-${ad.id}`;
    const data = JSON.parse(localStorage.getItem(key)) || { impressions: 0, clicks: 0 };
    data.clicks += 1;
    localStorage.setItem(key, JSON.stringify(data));

    // Optional: open ad link if it has one
    if (ad.link) {
      window.open(ad.link, "_blank");
    }
  };

  return (
    <div className="shadow-sm cursor-pointer" onClick={handleClick}>
      <div dangerouslySetInnerHTML={{ __html: ad.code }} />
    </div>
  );
}

export default Ad;
