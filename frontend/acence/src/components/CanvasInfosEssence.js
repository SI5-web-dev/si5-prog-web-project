import { Offcanvas } from "react-bootstrap";
import React, { useImperativeHandle, useState , useContext } from "react";
import "../styles/components/_canvasInfosEssence.scss";
import {ThemeContext} from "../context/ThemeContext";
import GraphPrice from "./GraphPrice";

const CanvasInfosEssence = React.forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const [listPrices, setListPrices] = useState([]);

    const { theme } = useContext(ThemeContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useImperativeHandle(ref, () => ({

        getAlert() {
            handleShow();
        }

    }));

    function ShowServices() {
        let services = [];
            if (props.station[5] !== null) {
                Array.prototype.forEach.call(props.station[5].service, service => {
                    services.push(service);
                })
        }
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
                if (props.station[6]) {//station[6] : horaires
                    Array.prototype.forEach.call(props.station[6].jour, jour => {
                        if (props.station[6].jour.horaire) {
                            horaires.push(jour["@nom"] + " : " + jour.horaire["@ouverture"] + "-" + jour.horaire["@fermeture"])
                        }
                        else {
                            horaires.push(jour["@nom"] + " : Horaires indisponible");
                        }
                    })
                    props.station[6]["@automate-24-24"] === "1" ? automate = true : automate = false
                }
                else {
                    horaires.push("Horaires indisponible");
                }
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
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    function getMaj(date){
        let maintenant = new Date();
        let jour = date.split(" ")[0].split("-");
        let heure = date.split(" ")[1].split(":");
        let jourMTN = formatDate(Date()).split("-");
        let heureMTN = [maintenant.getHours(), maintenant.getMinutes(),maintenant.getSeconds()]
        if((parseInt(jourMTN[0]) - parseInt(jour[0]))>0){
            return (parseInt(jourMTN[0]) - parseInt(jour[0]))+ ' an(s)'
        }else if((parseInt(jourMTN[1]) - parseInt(jour[1]))>0){
            return (parseInt(jourMTN[1]) - parseInt(jour[1]))+ ' mois'
        }else if((parseInt(jourMTN[2]) - parseInt(jour[2]))>0){
            return (parseInt(jourMTN[2]) - parseInt(jour[2]))+ ' jour(s)'
        }else if((parseInt(heureMTN[0]) - parseInt(heure[0]))>0){
            return (parseInt(heureMTN[0]) - parseInt(heure[0]))+ ' heure(s)'
        }else if((parseInt(heureMTN[1]) - parseInt(heure[1]))>0){
            return (parseInt(heureMTN[1]) - parseInt(heure[1]))+ ' minute(s)'
        }else if((parseInt(heureMTN[2]) - parseInt(heure[2]))>0){
            return (parseInt(heureMTN[2]) - parseInt(heure[2]))+ ' seconde(s)'
        }
        return 'maintenant'
    }

    function ShowGasPrices() {
        let prices = [];
                if (props.station[7]) {
                    Array.prototype.forEach.call(props.station[7], gas => {
                        prices.push(gas["@nom"] + " :   " + gas["@valeur"] + " (Il y a : " + getMaj(gas["@maj"]) + ")");
                    })
                }
        return (
            <div>
                <b>Prix :</b>
                <ul> {prices.map(gas => <li key={Math.random().toString(36).substring(2, 11)}>{gas}</li>)} </ul>
            </div>
        )
    }

    return (
        <div className={`canvasInfos ${theme}`}>
            <Offcanvas show={show} onHide={handleClose} placement="bottom" className={`canvas ${theme}`}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{props.nameStation} , {props.codePostal} {props.ville}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ShowServices />
                    <ShowHoraires />
                    <ShowGasPrices />
                    <h3>Historique des prix pour la station essence</h3>
                    <GraphPrice latitude={props.station[0]} longitude={props.station[1]}/>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
})

export default CanvasInfosEssence;
