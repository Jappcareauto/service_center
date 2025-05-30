import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "260px",
  borderRadius: '10px'
};

const centerDefault = {
  lat: 37.7749, // Default to San Francisco if geolocation fails
  lng: -122.4194
};

const MapWithMarker = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'API-KEY',
    // googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries
  });

  const [center, setCenter] = useState(centerDefault);
  const [marker, setMarker] = useState(null);
  const autoCompleteRef = useRef(null);

  // Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCenter(pos);
        setMarker(pos);
      },
      () => {
        console.warn("Geolocation not allowed. Using default location.");
      }
    );
  }, []);

  const onMapClick = useCallback((event) => {
    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarker(clickedLocation);
  }, []);

  const onPlaceChanged = () => {
    if (autoCompleteRef.current) {
      const place = autoCompleteRef.current.getPlace();
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      setCenter(location);
      setMarker(location);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => (autoCompleteRef.current = autocomplete)}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Search location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `40px`,
            padding: `0 12px`,
            marginBottom: `10px`,
            fontSize: `16px`
          }}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        onClick={onMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </div>
  );
};

export default MapWithMarker;
