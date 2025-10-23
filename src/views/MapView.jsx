// src/views/MapView.jsx
"use client";

import Navbar from "../components/layout/Navbar";
import FullMap from "@/components/domain/FullMap";
import InfoPopup from "@/components/ui/InfoPopup";

import { useUserLocation } from "@/hooks/useUserLocation";
import { useState } from "react";

export default function MapView() {
  const { location, setLocation, loading, error } = useUserLocation();
  const [infoMessage, setInfoMessage] = useState(null);

  return ( 

    <div className="generic-container">

        {infoMessage && (
          <InfoPopup
            message={infoMessage.text}
            type={infoMessage.type}
            onClose={() => setInfoMessage(null)}
          />
        )}

        <FullMap
          userLocation={location}
          setUserLocation={setLocation}
          loadingLocation={loading}
          infoMessage={infoMessage}
          setInfoMessage={setInfoMessage}
        />
      
    </div>

  );
}
