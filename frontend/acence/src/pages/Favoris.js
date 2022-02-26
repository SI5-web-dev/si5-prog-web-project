import React, {useEffect, useState , useContext} from "react";
import * as Utils from "../Utils";
import ListEssenceFav from "../components/ListEssenceFav";
import {ThemeContext} from "../context/ThemeContext";

function Favoris() {
    const [listStation, setListStation] = useState([]);

    const { theme } = useContext(ThemeContext);

    let arrayFormatListStations = [];

    useEffect(() => {
        console.log("heheh")
       createListStations()
    },[]);


    // creer la liste des stations essence favories
    function createListStations() {
        Utils.default.sendRequest('POST', '/user/listStationFav', JSON.stringify({
            'user': localStorage.getItem("token")
        }),setListStationsFav)

    }

    function setListStationsFav(response){
        if(JSON.parse(response).status !== "200"){
            alert(JSON.parse(response).message)
        }else{
            JSON.parse(response).listStations.forEach(station => {
                const latitude = parseFloat(station["@latitude"]) / 100000;
                const longitude = parseFloat(station["@longitude"]) / 100000;
                const adresse = station["adresse"];
                const ville = station["ville"];
                const codePostal = station["@cp"];
                const services = station["services"];
                const horaires = station["horaires"];
                const prix = station["prix"];
                arrayFormatListStations.push([latitude, longitude, adresse, ville, codePostal, services, horaires , prix]);
        });
            setListStation(arrayFormatListStations)
        }
    }

    return (
        <div className={`Favoris ${theme}`}>
            <h3>Vos stations essence favorites</h3>
            <div id="listFavoris">
                <ListEssenceFav list={listStation} nbStation={listStation.length} />
            </div>
        </div>
    )
}

export default Favoris;
