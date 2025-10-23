// src/components/domain/DecorativeMap.jsx
'use client';

import dynamic from 'next/dynamic';
import 'mapbox-gl/dist/mapbox-gl.css';
import { decorativeRoutes } from '@/components/domain/data/decorativeRoutes';
import { decorativePins } from '@/components/domain/data/decorativePins';

// Importación dinámica solo del componente Map
const Map = dynamic(() => import('react-map-gl/mapbox').then(mod => mod.Map), { ssr: false });
const Source = dynamic(() => import('react-map-gl/mapbox').then(mod => mod.Source), { ssr: false });
const Layer = dynamic(() => import('react-map-gl/mapbox').then(mod => mod.Layer), { ssr: false });
const Marker = dynamic(() => import('react-map-gl/mapbox').then(mod => mod.Marker), { ssr: false });

// Token de Mapbox desde variables de entorno
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function DecorativeMap({ className, width = "100%", height = "500px"}) {
  return (
    <div style={{ width, height , borderRadius: "16px", overflow: "hidden" }} className={className}>
      <Map
        initialViewState={{
          longitude: -74.0543621,
          latitude: 4.6538897,
          zoom: 14.25
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactive={false}
      >
        {/* Rutas decorativas */}
        <Source id="routes" type="geojson" data={decorativeRoutes}>
          <Layer
            id="routes-line"
            type="line"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": "#ff8000",
              "line-width": 4,
            }}
          />
        </Source>

        {/* Pins decorativos usando Marker */}
        {decorativePins.map(pin => (
          <Marker
            key={pin.id}
            longitude={pin.coordinates[0]}
            latitude={pin.coordinates[1]}
            anchor="center"
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#ff8000",
                borderRadius: "50%",
                border: "2px solid white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
              }}
            />
          </Marker>
        ))}
      </Map>
    </div>
  );
}
