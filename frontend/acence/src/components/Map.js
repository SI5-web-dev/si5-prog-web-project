import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/components/_map.scss';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as L from "leaflet";

const Map = () => {
    let defaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });

    const position = [43.6961, 7.27178]

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

