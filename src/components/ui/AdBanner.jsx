import { useEffect } from "react";

export default function AdBanner({
  adSlot,
  adFormat = "auto",
  adClient = import.meta.env.VITE_ADSENSE_PUBLISHER_ID,
  className,
  minHeight = 90,
  maxHeight,
}) {
  useEffect(() => {
    if (import.meta.env.DEV) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // silently ignore — ad blocker or script not yet loaded
    }
  }, []);

  if (import.meta.env.DEV) {
    return (
      <div
        className={className}
        style={{
          minHeight: `${minHeight}px`,
          background: "#1e293b",
          border: "1px dashed #475569",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#64748b",
          fontSize: "12px",
        }}
      >
        Ad Placeholder — slot: {adSlot}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        minHeight: `${minHeight}px`,
        ...(maxHeight ? { maxHeight: `${maxHeight}px`, overflow: "hidden" } : {}),
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        {...(adFormat === "auto" ? { "data-full-width-responsive": "true" } : {})}
      />
    </div>
  );
}
