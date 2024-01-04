import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import Image from '../assets/school.jpeg';
import waterRefillIcon from '../assets/water-refill-icon.png';
import 'leaflet/dist/leaflet.css';


const MapComponent = (props) => {
  const [userLocation, setUserLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(true); // Track location permission
  const [isRouting, setIsRouting] = useState(false);
  const [routingControl, setRoutingControl] = useState(null);
  const position = [1.310411032362568, 103.77767848691333];
  const refill = [
    { id: 1, coordinates: [1.310411032362568, 103.77767848691333], name: 'Water Refill #1' },
    { id: 2, coordinates: [1.309137, 103.775863], name: 'Water Refill #2' },
    // Add more refill locations as needed
  ];

  const customIcon = L.icon({
    iconUrl: waterRefillIcon,
    iconSize: [18, 29],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const mapRef = useRef();

  const handleRouteButtonClick = (refillLocation) => {
    if (isRouting) {
      setRoutingControl(null);
      setIsRouting(false);
    } else {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]),
          L.latLng(refillLocation.coordinates[0], refillLocation.coordinates[1]),
        ],
        routeWhileDragging: true,
        createMarker: function () {}, // Empty function to create no markers
        createButton: function () {}, // Empty function to create no control button
      });

      routingControl.addTo(mapRef.current);
      setRoutingControl(routingControl);
      setIsRouting(true);

      
    }
  };

  const handleStopRouting = () => {
    if (isRouting && routingControl) {
      mapRef.current.removeControl(routingControl);
      setRoutingControl(null);
      setIsRouting(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error(error);
        setHasLocationPermission(false);
      }
    );
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup when the component is unmounted
      if (routingControl) {
        mapRef.current.removeControl(routingControl);
      }
    };
  }, [routingControl]);

  return (
    <div id="map">
      <MapContainer center={position} zoom={16} style={{ width: '100%', height: '600px' }} ref={mapRef}>
        <TileLayer
          url="https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png"
          attribution='Map data © <a href="https://www.onemap.sg/" target="_blank">OneMap</a'
        />
        {userLocation && (
          <CircleMarker center={userLocation} radius={5} color="red">
            <Popup>User's Location</Popup>
          </CircleMarker>
        )}
        {refill.map((refillLocation) => (
          <Marker key={refillLocation.id} position={refillLocation.coordinates} icon={customIcon}>
            <Popup>
              <div id={`divRefill${refillLocation.id}`}>
                <h3 id={`Refill${refillLocation.id}`}>{refillLocation.name}</h3>
                <img src={Image} alt="Myself" />
                {hasLocationPermission && (
                  <button
                    id="RefillButton"
                    onClick={() => (isRouting ? handleStopRouting() : handleRouteButtonClick(refillLocation))}
                  >
                    {isRouting ? 'Stop Routing' : `Route to ${refillLocation.name}`}
                  </button>
                )}
                {!hasLocationPermission && <p>Please enable location services to show route</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
