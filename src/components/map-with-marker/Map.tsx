// components/CurrentLocationMap.tsx
import Home2Icon from "@/assets/icons/Home2Icon";
import { GOOGLE_API_KEY } from "@/config";
import {
    AdvancedMarker,
    APIProvider,
    Map
} from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";

const GOOGLE_MAPS_API_KEY = GOOGLE_API_KEY; // Replace with your key

const MapComponent: React.FC = () => {
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(
    null
  );
  const[defaultZoom, setDefaultZoom] = useState<number>(15);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className=" w-full h-[400px] rounded-xl p-2 relative flex overflow-hidden">
        {location && (
          <Map
            center={location}
            defaultZoom={defaultZoom} 
            style={{ width: "100%", height: "100%", borderRadius: "10px" }}
          >
            <AdvancedMarker position={location}>
              <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full text-white cursor-pointer" onClick={() =>setDefaultZoom(defaultZoom)}>
                <Home2Icon />
              </div>
            </AdvancedMarker>
          </Map>
        )}
        {/* <div className="flex justify-end items-center gap-x-2 absolute right-2 top-2">
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <ExpendedIcon />
          </button>
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <OpenIcon />
          </button>
        </div> */}
      </div>
    </APIProvider>
  );
};

export default MapComponent;
