import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import React, { useState } from 'react';
import '../styles/components/_map.scss';
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";
import { Button } from 'react-bootstrap';
import LocationMarker from './LocationMarker';
import axios from 'axios';


const Map = (props) => {
  const [currentPosition, setCurrentPosition] = useState([43.6961, 7.27178]);
  const [pathToStation, setPathToStation] = useState([]);

  function FlyToSearchedCity() {
    const map = useMap();

    if (props.list[0]) { //props.list[0][0]:lat et props.list[0][1]:lng
      map.flyTo([props.list[0][0], props.list[0][1]], map.getZoom());
    }
    return (
      <></>
    )
  }

  let defaultIcon = L.icon({
    iconUrl: require("../assets/gas-station.png"),
    iconAnchor: [25, 41],
    popupAnchor: [-12, -35],
    iconSize: new L.Point(25, 25),
  });

  function displayPath(station) {
    let path = [];
    const apiKey = '5b3ce3597851110001cf62481afd335205604f6f82b586bc039f1b78';
    const start = `${currentPosition.lng}, ${currentPosition.lat}`;
    const end = `${station[1]}, ${station[0]}`;
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start}&end=${end}`;
    axios.get(url).then((res) => {
      const temp = res.data.features[0].geometry.coordinates;
      temp.forEach(coord => {
        path.push([coord[1], coord[0]]);
      })
      setPathToStation(path);
    });
  }

  function PutMarkers() {
    let services = [];
    return (
      props.list.map(station =>
        <Marker position={[station[0], station[1]]} icon={defaultIcon} key={Math.random().toString(36).substring(2, 11)}>
          {services = []}
          {Array.prototype.forEach.call(station[5].service, service => {
            services.push(service);
          })}

          <Popup maxHeight="170">
            {station[2] + " " + station[3] + " " + station[4]}
            {<div>Services :</div>}
            <ul> {services.map(service => <li key={Math.random().toString(36).substring(2, 11)}>{service}</li>)} </ul>
            <Button onClick={() => displayPath(station)}>Voir le chemin</Button>
          </Popup>
        </Marker>
      )
    )
  }

  return (

    <div>
      <h3>{props.location ? `${props.location} ${props.list.length} stations d'essence trouvées` : "Effectuez une recherche pour trouver des stations d'essence"}</h3>
      <MapContainer id="map" className='map' center={currentPosition} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToSearchedCity />
        <LocationMarker currentPosition={currentPosition} setCurrentPosition={setCurrentPosition} />
        <PutMarkers />
        <Polyline positions={pathToStation} />
      </MapContainer>
    </div>
  );
};

export default Map;

