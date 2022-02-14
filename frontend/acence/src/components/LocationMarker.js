import { Marker, Popup ,useMap } from 'react-leaflet';
import React, { useState , useEffect } from 'react';
import '../styles/components/_map.scss';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as L from "leaflet";

let defaultIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: icon,
    shadowUrl: iconShadow
  });

function LocationMarker(props) {
    const [bbox, setBbox] = useState([]);

    const map = useMap();


    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            props.setCurrentPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            // const radius = e.accuracy;
            // const circle = L.circle(e.latlng, radius);
            // circle.addTo(map);
            setBbox(e.bounds.toBBoxString().split(","));
        });
    }, [map]);

    return props.currentPosition === null ? null : (
        <Marker position={props.currentPosition} icon={defaultIcon}>
            <Popup>
                Vous êtes ici. <br />
                Map bbox: <br />
                <b>Southwest lng</b>: {bbox[0]} <br />
                <b>Southwest lat</b>: {bbox[1]} <br />
                <b>Northeast lng</b>: {bbox[2]} <br />
                <b>Northeast lat</b>: {bbox[3]}
            </Popup>
        </Marker>
    );
}

export default LocationMarker;
