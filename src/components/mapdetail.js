import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import Image from '../assets/school.jpeg';
import waterMarker from '../assets/marker/water.png';
import registerMarker from '../assets/marker/register.png';
import conferenceMarker from '../assets/marker/conference.png';
import toiletMarker from '../assets/marker/toilet.png';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import polyline from 'polyline';
import config2 from './config2';

const MapComponent = (props) => {
  const localhostapi = "http://localhost:5000";
  const serverlessapi = "https://fyp-9bxz.onrender.com";
  const [userLocation, setUserLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(true);
  const [isRouting, setIsRouting] = useState(false);
  const [routingControl, setRoutingControl] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const position = [1.310411032362568, 103.77767848691333];
  const mapRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${localhostapi}/markers`);
        setMarkers(response.data);
        console.log('Refill data:', response.data);
      } catch (error) {
        console.error('Error fetching refill locations:', error);
      }
    };

    fetchData();
  }, []);

  const handleRouteButtonClick = async (coordinates) => {
    if (isRouting) {
      handleStopRouting();
    } else {
      try {
        if (!mapRef.current || !userLocation) {
          console.error('Map or user location not available.');
          return;
        }

        const urluser = `https://www.onemap.gov.sg/api/auth/post/getToken`;

        const requestBody = {
          email: config2.email,
          password: config2.password,
        };
        const userresponse = await fetch(urluser, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const userresponseData = await userresponse.json();
        console.log("token response", userresponseData.access_token);

        const authToken = userresponseData.access_token;
        const startCoordinates = `${userLocation[0]},${userLocation[1]}`;
        const endCoordinates = `${coordinates[0]},${coordinates[1]}`;

        const apiUrl = `https://www.onemap.gov.sg/api/private/routingsvc/route?start=${startCoordinates}&end=${endCoordinates}&routeType=walk`;

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          console.error('Error fetching route data:', response.status, response.statusText);
          return;
        }

        const routeData = await response.json();

        if (!routeData.route_geometry) {
          console.error('No route geometry found in the API response.');
          return;
        }

        const decodedCoordinates = polyline.decode(routeData.route_geometry);
        const routeLatLngs = decodedCoordinates.map(([lat, lng]) => L.latLng(lat, lng));

        const routePolyline = L.polyline(routeLatLngs, { color: 'blue' });

        const newRoutingControl = L.Routing.control({
          waypoints: [L.latLng(userLocation[0], userLocation[1]), L.latLng(coordinates[0], coordinates[1])],
          createMarker: function () {},
          routeLine: (route) => routePolyline,
        });

        newRoutingControl.addTo(mapRef.current);
        setRoutingControl(newRoutingControl);
        setIsRouting(true);
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  const handleStopRouting = () => {
    if (isRouting && routingControl) {
      mapRef.current.removeControl(routingControl);
      setRoutingControl(null);
      setIsRouting(false);
    }
  };

  const handleFilterClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const filteredMarkerLocations = markers.filter((markerlocation) => {
    return selectedCategory ? markerlocation.category === selectedCategory : true;
  });

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
      if (routingControl) {
        mapRef.current.removeControl(routingControl);
      }
    };
  }, [routingControl]);

  return (
    <div id="map" className="relative">
      <MapContainer center={position} zoom={16.5} className="w-full h-screen" ref={mapRef}>
        <TileLayer
          url="https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png"
          attribution='Map data © <a href="https://www.onemap.sg/" target="_blank">OneMap</a'
        />

        {userLocation && (
          <CircleMarker center={userLocation} radius={5} color="red">
            <Popup>User's Location</Popup>
          </CircleMarker>
        )}

        {filteredMarkerLocations.map((markerlocation) => {
          let iconUrl;

          switch (markerlocation.category) {
            case 'water':
              iconUrl = waterMarker;
              break;
            case 'register':
              iconUrl = registerMarker;
              break;
            case 'conference':
              iconUrl = conferenceMarker;
              break;
            case 'toilet':
              iconUrl = toiletMarker;
              break;
            default:
              iconUrl = waterMarker;
          }

          const customIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [18, 29],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          const coordinates = markerlocation.coordinates.split(',').map((coord) => parseFloat(coord));

          return (
            <Marker key={markerlocation.mapid} position={coordinates} icon={customIcon}>
              <Popup>
                <div id={`divRefill${markerlocation.mapid}`}>
                  <h3 id={`Refill${markerlocation.mapid}`}>{markerlocation.location_name}</h3>
                  <img src={Image} alt="Myself" />
                  <p>{markerlocation.description}</p>
                  {hasLocationPermission && (
                    <button
                      id="RefillButton"
                      onClick={() => (isRouting ? handleStopRouting() : handleRouteButtonClick(coordinates))}
                    >
                      {isRouting ? 'Stop Routing' : `Route to ${markerlocation.location_name}`}
                    </button>
                  )}
                  {!hasLocationPermission && <p>Please enable location services to show route</p>}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div id="buttons-container" className="flex flex-wrap justify-center items-center fixed bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <button
          className={`filter-button ${selectedCategory === 'water' ? 'water' : ''} px-3 py-2 mx-1 my-1 bg-blue-500 text-white rounded-md text-xs w-[5.5rem] h-12 md:text-sm  md:w-40`}
          onClick={() => handleFilterClick('water')}
        >
          Water Refill
        </button>
        <button
          className={`filter-button ${selectedCategory === 'register' ? 'register' : ''} px-3 py-2 mx-1 my-1 bg-[#B76711] text-white rounded-md text-xs w-[5.5rem] h-12 md:text-sm  md:w-40`}
          onClick={() => handleFilterClick('register')}
        >
          Registration Desks
        </button>
        <button
          className={`filter-button ${selectedCategory === 'conference' ? 'conference' : ''} px-3 py-2 mx-1 my-1 bg-[#39B54A] text-white rounded-md text-xs w-[5.5rem] h-12 md:text-sm  md:w-40`}
          onClick={() => handleFilterClick('conference')}
        >
          Conference Rooms
        </button>
        <button
          className={`filter-button ${selectedCategory === 'toilet' ? 'toilet' : ''} px-3 py-2 mx-1 my-1 bg-red-500 text-white rounded-md text-xs  w-[5.5rem] h-12 md:text-sm  md:w-40`}
          onClick={() => handleFilterClick('toilet')}
        >
          Restrooms
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
