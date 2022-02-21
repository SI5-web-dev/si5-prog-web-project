import { Table, Button } from "react-bootstrap";
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
                        const currentTime = d.getHours() + ":" + d.getMinutes(); //HH:MM
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

    function CreateList() {
        return (
            props.list.map(station => {
                return (
                    <tr key={Math.random().toString(36).substring(2, 11)}>
                        <td><b>{station[2]} , {station[4]} {station[3]}</b></td>
                        {showOuvertFerme(station)}
                        <td><Button variant="secondary" size="sm" onClick={() => { displayInfosStation(station[2], station[3], station[4]) }}>Plus d'infos</Button></td>
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
