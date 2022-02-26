import { Table, Button } from "react-bootstrap";
import React, { useState , useContext} from "react";
import { useRef } from "react";
import CanvasInfosEssence from "./CanvasInfosEssence";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import {ThemeContext} from "../context/ThemeContext";
import * as Utils from "./../Utils";

const ListEssence = (props) => {

    const childRef = useRef();

    const [nameStation, setNameStation] = useState(0);
    const [codePostal, setCodePostal] = useState(0);
    const [ville, setVille] = useState("");
    const [favoriteStationList, setFavoriteStationList] = useState(JSON.parse(localStorage.getItem("favoriteStations")));

    const { theme } = useContext(ThemeContext);

    function displayInfosStation(station, ville, codePostal) {
        setNameStation(station);
        setCodePostal(codePostal);
        setVille(ville);
        childRef.current.getAlert();
    }

    function showOuvertFerme(station) {
        let ouvertFerme = "";
        if (station[6]) {//station[6] : horaires
            Array.prototype.forEach.call(station[6].jour, jour => {
                if (jour.horaire) {
                    let heureOuverture = jour.horaire["@ouverture"];
                    let heurefermeture = jour.horaire["@fermeture"];

                    if (heureOuverture) {
                        heureOuverture = heureOuverture.replace('.', ':');
                    }
                    if (heurefermeture) {
                        heurefermeture = heurefermeture.replace('.', ':');
                    }

                    if (heureOuverture === heurefermeture) {
                        ouvertFerme = "Ouvert 24h/24";
                    }
                    else {
                        const d = new Date();
                        const currentHours = ("0" + d.getHours()).slice(-2);
                        const currentMinutes = ("0" + d.getMinutes()).slice(-2);
                        const currentTime = currentHours + ":" + currentMinutes; //HH:MM
                        if (currentTime >= heureOuverture && currentTime <= heurefermeture) {
                            ouvertFerme = "Ouvert";
                        }
                        else {
                            ouvertFerme = "Fermé";
                        }
                    }
                }
            })
        }
        return (
            ouvertFerme === "Ouvert" || ouvertFerme === "Ouvert 24h/24" ? <td id="ouvert"><b>{ouvertFerme}</b></td> :
                ouvertFerme === "Fermé" ?
                    <td id="ferme"><b>{ouvertFerme}</b></td> : <td id="indisponible"><b>Information indisponible</b></td>
        )
    }

    function showPrices(station) {
        let essence = ""
        if (station[7]) {
            Array.prototype.forEach.call(station[7], gas => {
                essence += gas["@nom"] + " :   " + gas["@valeur"] + " ";
            })
        }
        return (
            essence
        )
    }

    function addToFavoris(id) {
        if (!localStorage.getItem("token")) {
            alert("Connectez-vous avant d'ajouter une station à vos favoris")
        } else {
            if (id !== undefined) {
                var storageStation = JSON.parse(localStorage.getItem("favoriteStations"));
                storageStation.push(id);
                setFavoriteStationList(storageStation);
                Utils.default.sendRequest('POST', '/user/addFavorite', JSON.stringify({
                    'idStation': id,
                    'user': localStorage.getItem("token")
                })).then(r => localStorage.setItem("favoriteStations", JSON.stringify(storageStation)))
            } else {
                alert("Impossible d'ajouter cette station aux favoris")
            }
        }
    }

    function removeToFavoris(id) {
        if (id !== undefined) {
            let storageStation = JSON.parse(localStorage.getItem("favoriteStations"));
            let index = storageStation.indexOf(id);
            let firstPart = storageStation.splice(0, index);
            storageStation.shift()
            let secondPart = storageStation;
            storageStation = firstPart.concat(secondPart);
            setFavoriteStationList(storageStation);
            Utils.default.sendRequest('POST', '/user/removeFavorite', JSON.stringify({ 'idStation': id, 'user': localStorage.getItem("token") }), () => document.getElementById("favoriStar").visible = false).then(r => localStorage.setItem("favoriteStations", JSON.stringify(storageStation)))
        } else {
            alert("Impossible d'enlever cette station des favoris")
        }
    }

    function DisplayStar(props) {
        const idStation = props.coord1 + "," + props.coord2;
        const favStationList = localStorage.getItem("favoriteStations");
        if (favStationList !== null) {
            if (favoriteStationList.includes(idStation)) {
                return <div id="favoriStar" onClick={() => removeToFavoris(idStation)}><FontAwesomeIcon
                    icon={faStarSolid} /></div>;
            }
        }
        return <div id="favoriStar" onClick={() => { addToFavoris(idStation) }}><FontAwesomeIcon icon={faStarRegular} /></div>;
    }

    function CreateListIfFav(){
        if(props.nbStation === 0){
            return <div><h5>Vous n'avez pas encore de stations essence favorites</h5></div>
        }else{
            return <CreateList/>
        }
    }

    function CreateListFav() {
        return (
            props.list.map(station => {
                    return (
                        <tr key={Math.random().toString(36).substring(2, 11)}>
                            <td>
                                <b>{station[2]} - {station[4]} {station[3]}</b>
                                <br />
                                {showPrices(station)}
                            </td>
                            {showOuvertFerme(station)}
                            <td><DisplayStar coord1={station[0]} coord2={station[1]} /></td>
                            <td><Button variant="secondary" size="sm" onClick={() => { displayInfosStation(station[2], station[3], station[4]) }}>Plus d'infos</Button></td>
                            {/* <td><Button variant="primary" onClick={() => { props.bam(station) }}>Voir sur la map</Button></td> */}
                        </tr>
                    )
                },
            )
        )
    }

    function CreateList() {
        return (
                <div id="table">
                    <Table className="styled-table" responsive="sm">
                        <thead >
                        <tr>
                            <td colSpan="1"><b>Stations d'essence</b></td>
                            <td colSpan="1"><b>Ouvert/fermé</b></td>
                            <td colSpan="1"><b>Ajout en favoris</b></td>
                            <td colSpan="1"><b>Plus d'info</b></td>
                        </tr>
                        </thead>
                        <tbody>
                        <CreateListFav />
                        </tbody>
                    </Table>
                </div>
        )
    }

    return (
        <div className={`listEssenceFav ${theme}`}>
        <CreateListIfFav/>
            <CanvasInfosEssence
                ref={childRef}
                nameStation={nameStation}
                codePostal={codePostal}
                ville={ville}
                list={props.list} />
        </div>
    );
};

export default ListEssence;
