import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import Image from '../assets/school.jpeg';
import waterRefillIcon from '../assets/water-refill-icon.png';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapComponent = (props) => {
  const [userLocation, setUserLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(true);
  const [isRouting, setIsRouting] = useState(false);
  const [routingControl, setRoutingControl] = useState(null);
  const [refill1, setRefill1] = useState([]);
  const position = [1.310411032362568, 103.77767848691333];

  const customIcon = L.icon({
    iconUrl: waterRefillIcon,
    iconSize: [18, 29],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/markers');
        setRefill1(response.data);
        console.log('Refill data:', response.data);
      } catch (error) {
        console.error('Error fetching refill locations:', error);
      }
    };
  
    fetchData();
  }, []);

  const mapRef = useRef();

  const handleRouteButtonClick = (coordinates) => {
    if (isRouting) {
      setRoutingControl(null);
      setIsRouting(false);
    } else {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]),
          L.latLng(coordinates[0], coordinates[1]),
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
        {refill1.map((refillLocation) => {
          // Log the refillLocation data
         

          const coordinates = refillLocation.coordinates.split(',').map((coord) => parseFloat(coord))
          console.log('Refill Location:', coordinates);
          // Add a check to ensure refillLocation.coordinates is not null or undefined
         
            return (
              <Marker key={refillLocation.mapid} position={coordinates} icon={customIcon}>
                <Popup>
                  <div id={`divRefill${refillLocation.mapid}`}>
                    <h3 id={`Refill${refillLocation.mapid}`}>{refillLocation.location_name}</h3>
                    <img src={Image} alt="Myself" />
                    <p>{refillLocation.description}</p>
                    {hasLocationPermission && (
                      <button
                        id="RefillButton"
                        onClick={() => (isRouting ? handleStopRouting() : handleRouteButtonClick(coordinates))}
                      >
                        {isRouting ? 'Stop Routing' : `Route to ${refillLocation.location_name}`}
                      </button>
                    )}
                    {!hasLocationPermission && <p>Please enable location services to show route</p>}
                  </div>
                </Popup>
              </Marker>
            );
           // or you can render a default marker or handle it according to your use case
          
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
