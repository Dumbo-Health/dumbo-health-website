'use client';

import { useEffect, useRef, useState } from 'react';

interface LocationBoundingBox {
  min_lat: string | number;
  max_lat: string | number;
  min_lon: string | number;
  max_lon: string | number;
  center_lat?: string | number;
  center_lon?: string | number;
  zoom?: string | number;
}

interface LeafletMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  boundingBox?: LocationBoundingBox | null;
  className?: string;
  popupText?: string;
}

export default function LeafletMapComponent({ 
  lat = 25.7617, 
  lng = -80.1918, 
  zoom = 9, 
  boundingBox, 
  className = "w-full h-96",
  popupText = ""
}: LeafletMapProps) {
  const mapRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const mapId = useRef(`leaflet-map-${Math.random().toString(36).substr(2, 9)}`);
  
  // Calculate center from bounding box or use provided lat/lng
  const getMapCenter = (): { lat: number; lng: number } => {
    if (boundingBox) {
      const centerLat = boundingBox.center_lat ? 
        parseFloat(boundingBox.center_lat.toString()) : 
        (parseFloat(boundingBox.min_lat.toString()) + parseFloat(boundingBox.max_lat.toString())) / 2;
      const centerLng = boundingBox.center_lon ? 
        parseFloat(boundingBox.center_lon.toString()) : 
        (parseFloat(boundingBox.min_lon.toString()) + parseFloat(boundingBox.max_lon.toString())) / 2;
      return { lat: centerLat, lng: centerLng };
    }
    return { lat, lng };
  };

  const center = getMapCenter();
  
  // Use zoom from bounding box if available, otherwise use provided zoom
  const mapZoom = boundingBox?.zoom ? parseInt(boundingBox.zoom.toString()) : zoom;

  // Set client state to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    // Dynamically import Leaflet to avoid SSR issues
    const loadMap = async () => {
      if (typeof window !== 'undefined') {
        const L = (await import('leaflet')).default;
        
        // Import Leaflet CSS
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
          document.head.appendChild(link);
        }
        
        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Clean up existing map instance if it exists
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }

        // Get the map container
        const mapContainer = document.getElementById(mapId.current);
        if (mapContainer) {
          mapContainer.innerHTML = '';
        }

        // Create the map
        const map = L.map(mapId.current).setView([center.lat, center.lng], mapZoom);
        mapRef.current = map;

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add a marker at the center
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: '<div style="background-color: #ff8361; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });
        if (popupText){
          L.marker([center.lat, center.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(popupText);
        } else {
          L.marker([center.lat, center.lng], { icon: customIcon })
          .addTo(map)
        }
        // If we have a bounding box, fit the map to those bounds
        if (boundingBox) {
          const bounds = L.latLngBounds(
            [parseFloat(boundingBox.min_lat.toString()), parseFloat(boundingBox.min_lon.toString())],
            [parseFloat(boundingBox.max_lat.toString()), parseFloat(boundingBox.max_lon.toString())]
          );
          map.fitBounds(bounds);
        }

        // Disable some interactions for a cleaner look
        map.scrollWheelZoom.disable();
        map.doubleClickZoom.disable();
        map.dragging.disable();
        map.touchZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if ((map as any).tap) (map as any).tap.disable();
      }
    };

    loadMap();

    // Cleanup function to properly remove the map
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isClient, center.lat, center.lng, mapZoom, boundingBox]);

  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      {isClient ? (
        <div 
          id={mapId.current}
          className="w-full h-full rounded-lg shadow-lg"
          style={{ height: '100%' }}
        />
      ) : (
        <div 
          className="w-full h-full rounded-lg shadow-lg bg-gray-100 flex items-center justify-center"
          style={{ height: '100%' }}
        >
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}
    </div>
  );
}
