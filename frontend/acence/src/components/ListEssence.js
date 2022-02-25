import { Table, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import CanvasInfosEssence from "./CanvasInfosEssence";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import * as Utils from "./../Utils";

const ListEssence = (props) => {

    const childRef = useRef();

    const [nameStation, setNameStation] = useState(0);
    const [codePostal, setCodePostal] = useState(0);
    const [ville, setVille] = useState("");
    const [favoriteStationList, setFavoriteStationList] = useState(JSON.parse(localStorage.getItem("favoriteStations")));

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

    function createColorIcon(prix) {
        let min = document.getElementById("minimum").innerHTML
        let max = document.getElementById("maximum").innerHTML
        let percentFade = (parseFloat(prix) - parseFloat(min)) / (parseFloat(max) - parseFloat(min));
        let rouge;
        let bleu;
        let vert;
        if (percentFade < 0.5) {
            rouge = 33 + (166 * percentFade);
            bleu = 33;
            vert = 196;
        } else {
            rouge = 196;
            bleu = 33;
            vert = 196 - (166 * percentFade);
        }

        return "rgb(" + rouge + "," + vert + "," + bleu + ")"
    }

    function CreateList() {
        return (
            props.list.map(station => {
                return (
                    <tr key={Math.random().toString(36).substring(2, 11)}>
                        <td>
                            <b>{station[2]} - {station[4]} {station[3]}</b>
                            <br />
                            {showPrices(station)}
                        </td>
                        <td><b><span style={{ color: createColorIcon(parseFloat(station[9]["@valeur"])) }}>{Math.round((parseFloat(station[9]["@valeur"]) + Number.EPSILON) * 100) / 100}</span></b></td>
                        <td><b>{Math.round((station[8] + Number.EPSILON) * 100) / 100} km </b></td>
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
    function sortTable() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.querySelector(".styled-table");
        if (table) {
            switching = true;
            while (switching) {
                switching = false;
                rows = table.rows;
                if (props.search) {
                    for (i = 1; i < (rows.length - 1); i++) {
                        shouldSwitch = false;
                        x = rows[i].getElementsByTagName("TD")[2];
                        y = rows[i + 1].getElementsByTagName("TD")[2];

                        x = parseFloat(x.innerHTML.split(' km')[0].split('<b>')[1]);
                        y = parseFloat(y.innerHTML.split(' km')[0].split('<b>')[1]);
                        if (x > y) {
                            shouldSwitch = true;
                            break;
                        }
                    }

                } else {
                    for (i = 1; i < (rows.length - 1); i++) {
                        shouldSwitch = false;
                        x = rows[i].getElementsByTagName("TD")[1];
                        y = rows[i + 1].getElementsByTagName("TD")[1];

                        x = parseFloat(x.innerHTML.split(';">')[1].split("</span>")[0])
                        y = parseFloat(y.innerHTML.split(';">')[1].split("</span>")[0])
                        if (x > y) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }
    }
    useEffect(() => {
        sortTable();
    })

    return (
        <div className="listEssence">
            <div id="table">
                <Table className="styled-table" responsive="sm">
                    <thead >
                        <tr>
                            <td colSpan="1"><b>Stations d'essence</b></td>
                            <td colSpan="1"><b>Prix €/L</b></td>
                            <td colSpan="1"><b>Distance</b></td>
                            <td colSpan="1"><b>Ouvert/fermé</b></td>
                            <td colSpan="1"><b>Ajout en favoris</b></td>
                            <td colSpan="1"><b>Plus d'info</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        <CreateList />
                    </tbody>
                </Table>
            </div>
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
