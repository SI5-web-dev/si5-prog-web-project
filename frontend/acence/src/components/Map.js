import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import React, { useState } from 'react';
import '../styles/components/_map.scss';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as L from "leaflet";
import LocationMarker from './LocationMarker';


const Map = (props) => {
  console.log("mapppp :", props);
  let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [25, 41],
    popupAnchor: [-12, -35]
  });

  const position = [43.6961, 7.27178]

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
          </Popup>
        </Marker>
      )
    )
  }

  return (
    <MapContainer id="map" className='map' center={position} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker/>
      <PutMarkers />
    </MapContainer>
  );
};

export default Map;

