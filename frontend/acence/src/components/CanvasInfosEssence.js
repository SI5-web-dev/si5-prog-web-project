import { Offcanvas } from "react-bootstrap";
import React, { useImperativeHandle, useState } from "react";
import "../styles/components/_canvasInfosEssence.scss"

const CanvasInfosEssence = React.forwardRef((props, ref) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useImperativeHandle(ref, () => ({

        getAlert() {
            handleShow();
        }

    }));

    function ShowServices() {
        let services = [];
        props.list.map(station => {
            if (station[2] === props.nameStation) {
                Array.prototype.forEach.call(station[5].service, service => {
                    services.push(service);
                })
            }
        })

        return (
            <>
                <div>
                    <b>Services :</b>
                    <ul> {services.map(service => <li key={Math.random().toString(36).substring(2, 11)}>{service}</li>)} </ul>
                </div>
            </>
        )
    }

    function ShowHoraires() {
        let horaires = [];
        let automate = false;
        props.list.map(station => {
            if (station[2] === props.nameStation) {
                if (station[6]) {//station[6] : horaires
                    Array.prototype.forEach.call(station[6].jour, jour => {
                        if (jour.horaire) {
                            horaires.push(jour["@nom"] + " : " + jour.horaire["@ouverture"] + "-" + jour.horaire["@fermeture"])
                        }
                        else {
                            horaires.push(jour["@nom"] + " : Horaires indisponible");
                        }
                    })
                    station[6]["@automate-24-24"] === "1" ? automate = true : automate = false
                }
                else {
                    horaires.push("Horaires indisponible");
                }
            }
        })

        return (
            <>
                <div>
                    <b>Automates 24/24 : </b> {automate ? "Disponible" : "Non disponible"}
                    <br></br>
                    <b>Horaires :</b>
                    <table className="tableHoraires">
                        <thead>
                            <tr>
                                <td colSpan={1}>Jour</td>
                                <td colSpan={1}>Horaires</td>
                            </tr>
                        </thead>
                        <tbody>
                            {horaires.map(horaire =>
                                <tr key={Math.random().toString(36).substring(2, 11)}>
                                    <td key={Math.random().toString(36).substring(2, 11)}>{horaire.split(":")[0]}</td>
                                    <td key={Math.random().toString(36).substring(2, 11)}>{horaire.split(":")[1] ? horaire.split(":")[1].replaceAll('.', ':') : horaire.split(":")[1]}</td>
                                    {/* <td key={Math.random().toString(36).substring(2, 11)}>{horaire.split(":")[1]}</td> */}
                                </tr>)
                            }
                        </tbody>
                    </table>
                    {/* <ul> {horaires.map(horaire => <li key={Math.random().toString(36).substring(2, 11)}>{horaire}</li>)} </ul> */}
                </div>
            </>
        )
    }

    function ShowGasPrices() {
        let prices = [];
        props.list.map(station => {
            if (station[2] === props.nameStation) {
                if (station[7]) {
                    Array.prototype.forEach.call(station[7], gas => {
                        prices.push(gas["@nom"] + " :   " + gas["@valeur"] + " (Dernière mise à jour : " + gas["@maj"] + ")");
                    })
                }
            }
        })

        return (
            <div>
                <b>Prix :</b>
                <ul> {prices.map(gas => <li key={Math.random().toString(36).substring(2, 11)}>{gas}</li>)} </ul>
            </div>
        )
    }

    return (
        <div className="canvasInfos">
            <Offcanvas show={show} onHide={handleClose} placement="bottom">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{props.nameStation} , {props.codePostal} {props.ville}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ShowServices />
                    <ShowHoraires />
                    <ShowGasPrices />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
})

export default CanvasInfosEssence;
