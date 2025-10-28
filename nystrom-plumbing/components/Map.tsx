'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return;

    // Charlotte, NC coordinates (approximate city center)
    const charlotteCoords: [number, number] = [35.2271, -80.8431];

    // Initialize map
    const map = L.map(mapRef.current).setView(charlotteCoords, 13);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Custom icon
    const icon = L.divIcon({
      html: '<div style="background-color: #1e40af; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      className: 'custom-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Add marker
    L.marker(charlotteCoords, { icon })
      .addTo(map)
      .bindPopup('<strong>Nystrom Plumbing</strong><br>Serving Charlotte, NC');

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}
