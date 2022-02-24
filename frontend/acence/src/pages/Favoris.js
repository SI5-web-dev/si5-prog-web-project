import ListEssence from "../components/ListEssence";
import React, {useEffect, useState} from "react";
import * as Utils from "../Utils";

function Favoris() {
    const [listStation, setListStation] = useState([]);

    let arrayFormatListStations = [];

    useEffect(() => {
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
            let header = document.querySelector("#table");
            header.style.display = "block";
        }
    }

    return (
        <div className="Favoris">
            <h3>Vos stations essence favorites</h3>
            <div id="listFavoris">
                <ListEssence list={listStation} />
            </div>
        </div>
    )
}

export default Favoris;
