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
  
  /*let defaultIcon = L.icon({
    iconUrl: require("../assets/gas-station.png"),
    iconAnchor: [25, 41],
    popupAnchor: [-12, -35],
    iconSize: new L.Point(25, 25),
  });*/





function getIcon(prix){
  const markerHtmlStyles = `
    background-color: ${createColorIcon(parseFloat(prix["@valeur"]))};
    width: 3rem;
    height: 3rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`

  const defaultIcon = L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}" />`
  })
  return defaultIcon
}
  

  function createColorIcon(prix){
    console.log(prix)
     let min = document.getElementById("minimum").innerHTML
     let max = document.getElementById("maximum").innerHTML
     console.log(min , max);
      let percentFade  =  (parseFloat(prix)-parseFloat(min))/(parseFloat(max)-parseFloat(min));
      console.log(percentFade)
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

