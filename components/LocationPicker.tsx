"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin } from "lucide-react";

// Fix Leaflet default marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LocationData {
  lat: number;
  lon: number;
  address: string;
  displayName: string;
}

interface LocationPickerProps {
  onLocationSelect: (data: LocationData) => void;
  initialLat?: number;
  initialLon?: number;
  initialLocation?: { lat: number; lon: number };
  readOnly?: boolean;
}

interface SearchResult {
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    village?: string;
    suburb?: string;
    city?: string;
    municipality?: string;
    county?: string;
    state?: string;
    postcode?: string;
  };
}

export default function LocationPicker({
  onLocationSelect,
  initialLat = -7.683,
  initialLon = 108.65,
  initialLocation,
  readOnly = false,
}: LocationPickerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

  // Use initialLocation if provided, otherwise use initialLat/initialLon
  const startLat = initialLocation?.lat || initialLat;
  const startLon = initialLocation?.lon || initialLon;

  useEffect(() => {
    // Initialize map
    if (!mapRef.current) {
      const map = L.map("location-map").setView([startLat, startLon], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Add click handler only if not readOnly
      if (!readOnly) {
        map.on("click", async (e) => {
          const { lat, lng } = e.latlng;
          await handleMapClick(lat, lng);
        });
      }

      mapRef.current = map;

      // If initialLocation is provided, add marker immediately
      if (initialLocation) {
        const marker = L.marker([initialLocation.lat, initialLocation.lon])
          .addTo(map);
        markerRef.current = marker;
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [startLat, startLon, readOnly, initialLocation]);

  const handleMapClick = async (lat: number, lng: number) => {
    try {
      // Reverse geocoding to get address
      const res = await fetch(`/api/geocode?lat=${lat}&lon=${lng}`);
      const data = await res.json();

      if (data.error) {
        console.error("Geocoding error:", data.error);
        return;
      }

      const locationData: LocationData = {
        lat,
        lon: lng,
        address: formatAddress(data),
        displayName: data.display_name || "",
      };

      updateMarker(lat, lng, locationData.displayName);
      setSelectedLocation(locationData);
      onLocationSelect(locationData);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const formatAddress = (data: any): string => {
    const addr = data.address || {};
    const parts = [
      addr.village || addr.suburb,
      addr.city || addr.municipality || addr.county,
      addr.state,
    ].filter(Boolean);
    return parts.join(", ") || data.display_name || "";
  };

  const updateMarker = (lat: number, lng: number, popupText: string) => {
    if (!mapRef.current) return;

    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.remove();
    }

    // Add new marker
    markerRef.current = L.marker([lat, lng])
      .addTo(mapRef.current)
      .bindPopup(popupText)
      .openPopup();

    // Center map on marker
    mapRef.current.setView([lat, lng], 15);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const res = await fetch(
        `/api/geocode?q=${encodeURIComponent(searchQuery + ", Pangandaran")}`
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    const locationData: LocationData = {
      lat,
      lon: lng,
      address: formatAddress(result),
      displayName: result.display_name,
    };

    updateMarker(lat, lng, result.display_name);
    setSelectedLocation(locationData);
    onLocationSelect(locationData);
    setSearchResults([]);
    setSearchQuery("");
  };

  return (
    <div className="space-y-4">
      {/* Search Bar - only show if not readOnly */}
      {!readOnly && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Cari Lokasi
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Cari lokasi di Pangandaran..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              disabled={searching}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {searching ? "..." : "Cari"}
            </button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="border border-slate-300 rounded-lg max-h-48 overflow-y-auto bg-white shadow-lg">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectResult(result)}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-200 last:border-b-0 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="text-sm text-slate-700">
                      {result.display_name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Map */}
      <div>
        {!readOnly && (
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Pilih Lokasi di Peta (Klik pada peta)
          </label>
        )}
        <div
          id="location-map"
          className="h-[400px] w-full rounded-lg border border-slate-300 shadow-sm"
        />
      </div>

      {/* Selected Location Info - only show if not readOnly */}
      {!readOnly && selectedLocation && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">
                Lokasi Dipilih:
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {selectedLocation.displayName}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Koordinat: {selectedLocation.lat.toFixed(6)},{" "}
                {selectedLocation.lon.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      )}

      {!readOnly && (
        <p className="text-xs text-slate-500">
          💡 Tips: Gunakan kolom pencarian atau klik langsung pada peta untuk
          memilih lokasi
        </p>
      )}
    </div>
  );
}
