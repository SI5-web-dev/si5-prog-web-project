import { Table, Button } from "react-bootstrap";
import { useMap } from 'react-leaflet';
import React, { useState } from "react";
import { useRef } from "react";
import CanvasInfosEssence from "./CanvasInfosEssence";

const ListEssence = (props) => {

    const childRef = useRef();

    const [nameStation, setNameStation] = useState(0);
    const [codePostal, setCodePostal] = useState(0);
    const [ville, setVille] = useState("");

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
                    const heureOuverture = jour.horaire["@ouverture"];
                    const heurefermeture = jour.horaire["@fermeture"];
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
                <td id="ferme"><b>{ouvertFerme}</b></td>
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

    function CreateList() {
        return (
            props.list.map(station => {
                return (
                    <tr key={Math.random().toString(36).substring(2, 11)}>
                        <td>
                            <b>{station[2]} , {station[4]} {station[3]}</b>
                            <br />
                            {showPrices(station)}
                        </td>
                        {showOuvertFerme(station)}
                        <td><img width="60" alt="" src="https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-vector-star-icon-png-image_1577370.jpg" /></td>
                        <td><Button variant="secondary" size="sm" onClick={() => { displayInfosStation(station[2], station[3], station[4]) }}>Plus d'infos</Button></td>
                        {/* <td><Button variant="primary" onClick={() => { props.bam(station) }}>Voir sur la map</Button></td> */}
                    </tr>)
            })
        )
    }

    return (
        <div className="listEssence">
            <Table responsive="sm">
                <tbody>
                    <CreateList />
                </tbody>
            </Table>
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
