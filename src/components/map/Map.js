import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { toast } from "react-toastify";

export default function Map({ readonly, location, onChange }) {
  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={1}
        dragging={!readonly}
        touchZoom={!readonly}
        doubleClickZoom={!readonly}
        scrollWheelZoom={!readonly}
        boxZoom={!readonly}
        keyboard={!readonly}
        attributionControl={false}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FindButtonAndMaker
          readonly={readonly}
          location={location}
          onChange={onChange}
        />
      </MapContainer>
      ;
    </div>
  );
}

function FindButtonAndMaker({ readonly, location, onChange }) {
  const [position, setPosition] = useState(location);

  useEffect(() => {
    if (readonly) {
      map.setView(position, 13);
      return;
    }
    if (position) onChange(position);
  }, [position]);

  const map = useMapEvents({
    click(e) {
      !readonly && setPosition(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    },
    locationerror(e) {
      toast.error(e.message);
    },
  });

  return (
    <>
      {!readonly && (
        <button
          className="btn btn-primary fs-5"
          onClick={() => map.locate()}
          style={{
            position: "absolute",
            width: "12rem",
            zIndex: 99999,
            top: "10px",
            left: "200px",
          }}
        >
          Find my location
        </button>
      )}
      {position && (
        <Marker
          eventHandlers={{
            dragend: (e) => {
              setPosition(e.target.getLatLng());
            },
          }}
          position={position}
          draggable={!readonly}
        >
          <Popup>Shiping Location</Popup>
        </Marker>
      )}
    </>
  );
}
