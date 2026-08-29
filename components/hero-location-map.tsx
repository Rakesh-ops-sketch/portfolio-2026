export function HeroLocationMap() {
  return (
    <div
      className="hero-location-map"
      aria-hidden="true"
      style={{ position: "absolute", zIndex: 0, inset: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      <iframe
        className="hero-location-map-frame"
        title="Map of Bengaluru, India"
        src="https://www.openstreetmap.org/export/embed.html?bbox=77.4700%2C12.8900%2C77.7200%2C13.0550&layer=mapnik&marker=12.9716%2C77.5946"
        loading="eager"
        tabIndex={-1}
      />
      <div className="hero-location-map-wash" />
    </div>
  );
}
