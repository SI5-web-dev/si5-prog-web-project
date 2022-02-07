import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/components/_map.scss';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as L from "leaflet";


const Map = (props) => {
    let defaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor:   [22, 94]
    });
    
    const position = [43.6961, 7.27178]
    let map = document.getElementById("map");
    /*
    props.list.forEach(element => {
        const MyPopupMarker =({ element }) => (
            <Marker position={element}>
             <Popup>{"bla"}</Popup>
            </Marker>
           )
        let marker = new Marker();
        marker.position = element;
        marker.icon = defaultIcon;
        let popup = document.createElement("Popup");
        popup.innerHTML = "c'est un putain de point";
        marker.appendChild(popup)
        map.appendChild(MyPopupMarker);
    });*/
        
    
    return (
        <MapContainer id="map" className='map' center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={defaultIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;

