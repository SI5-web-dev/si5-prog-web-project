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

    map.flyTo([props.coordinates[0] , props.coordinates[1] , map.getZoom()]);

    return (
      <></>
    )
  }

function getIcon(prix){
  const markerHtmlStyles = `
    background-color: ${createColorIcon(parseFloat(prix["@valeur"]))};
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1rem;
    top: -1rem;
    position: relative;
    border-radius: 2rem 2rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`

  const defaultIcon = L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}"></span>`
  })
  return defaultIcon
}


  function createColorIcon(prix){
     let min = document.getElementById("minimum").innerHTML
     let max = document.getElementById("maximum").innerHTML
      let percentFade  =  (parseFloat(prix)-parseFloat(min))/(parseFloat(max)-parseFloat(min));
      let rouge ;
      let bleu ;
      let vert;
      if(percentFade<0.5){
        rouge = 33 + (166*percentFade) ;
        bleu = 33;
        vert = 196 ;
      }else{
        rouge = 196  ;
        bleu = 33;
        vert = 196 - (166*percentFade);
      }

      return "rgb("+rouge+","+vert+","+bleu+");"
  }

  function displayPath(station) {
    let path = [];
    const apiKey = '5b3ce3597851110001cf62481afd335205604f6f82b586bc039f1b78';
    const start = `${currentPosition.lng}, ${currentPosition.lat}`;
    if(currentPosition.lng === undefined){
      alert("Vous devez acceptez l'autorisation de géolocalisation");
    }else {
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
  }

  function showPrices(station) {
    let gasPrices = [];
    let stationName = station[2] + " " + station[4] + " " + station[3];
    if (station[7]) {
      Array.prototype.forEach.call(station[7], gas => {
        gasPrices.push(gas["@nom"] + " :   " + gas["@valeur"] );
      })
    }

    return (
      <>
        <b>{stationName}</b>
        <br></br>
        <b>Essence disponible :</b>
        <ul> {gasPrices.map(essence => <li key={Math.random().toString(36).substring(2, 11)}>{essence}</li>)} </ul>
      </>
    )

  }

  function PutMarkers() {
    return (
      props.list.map(station =>
        <Marker position={[station[0], station[1]]} icon={getIcon(station[9])} key={Math.random().toString(36).substring(2, 11)}>

          <Popup maxHeight="190">
            {showPrices(station)}
            <Button id="buttonPath" onClick={() => displayPath(station)}>Voir le chemin</Button>
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

