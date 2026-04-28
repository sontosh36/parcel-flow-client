import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.searchLocation.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (district) {
      const cordinate = [district.latitude, district.longitude];
      mapRef.current.flyTo(cordinate, 14);
    }
  };
  return (
    <div className="max-w-7xl mx-auto bg-white px-4">
      <div className="py-6">
        <div className="flex flex-col items-center mb-9">
          <h3 className="text-center text-4xl md:text-5xl text-secondary mb-8">
            We are available in 64 districts
          </h3>
          <form onSubmit={handleSearch}>
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                name="searchLocation"
                required
                placeholder="Search"
              />
            </label>
          </form>
        </div>

        <div className="border">
          <MapContainer
            center={position}
            zoom={10}
            scrollWheelZoom={false}
            className="h-[700px]"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {serviceCenters.map((center, i) => (
              <Marker position={[center.latitude, center.longitude]} key={i}>
                <Popup>
                  <strong>{center.district}</strong> <br /> Service Area:{" "}
                  {center.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
