import {Table, Badge, Button} from "react-bootstrap";
import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons'
import {useRef} from "react";
import CanvasInfosEssence from "./CanvasInfosEssence";

const ListEssence = () => {

    const childRef = useRef();

    const [nameStation, setNameStation] = useState(0);

    function displayInfosStation(station){
        setNameStation(station);
        childRef.current.getAlert();
    }

    return (
        <>
        <Table responsive="sm">
        <tbody>
        <tr>
            <td>Station de Carrefour - Antibes - adresse</td>
            <td>SP95-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td>SP98-1.702 <FontAwesomeIcon icon={faChevronDown} color={"green"}/></td>
            <td>Diesel-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td><FontAwesomeIcon icon={faStar}/></td>
            <td><Badge pill bg="danger">
                Fermée
            </Badge></td>
            <td><Button variant="secondary" size="sm" onClick={()=>{displayInfosStation("Station de Carrefour")}}>Plus d'infos</Button></td>
        </tr>
        <tr>
            <td>Station de Carrefour - Antibes - adresse</td>
            <td>SP95-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td>SP98-1.702 <FontAwesomeIcon icon={faChevronDown} color={"green"}/></td>
            <td>Diesel-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td><FontAwesomeIcon icon={faStar}/></td>
            <td><Badge pill bg="success">
                Ouvert
            </Badge></td>
            <td><Button variant="secondary" size="sm" onClick={()=>{displayInfosStation("Station de Carrefour")}}>Plus d'infos</Button></td>
        </tr>
        <tr>
            <td>Station de Carrefour - Antibes - adresse</td>
            <td>SP95-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td>SP98-1.702 <FontAwesomeIcon icon={faChevronDown} color={"green"}/></td>
            <td>Diesel-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td><FontAwesomeIcon icon={faStar}/></td>
            <td><Badge pill bg="danger">
                Fermée
            </Badge></td>
            <td><Button variant="secondary" size="sm" onClick={()=>{displayInfosStation("Station de Carrefour")}}>Plus d'infos</Button></td>
        </tr>
        <tr>
            <td>Station de Carrefour - Antibes - adresse</td>
            <td>SP95-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td>SP98-1.702 <FontAwesomeIcon icon={faChevronDown} color={"green"}/></td>
            <td>Diesel-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td><FontAwesomeIcon icon={faStar}/></td>
            <td><Badge pill bg="danger">
                Fermée
            </Badge></td>
            <td><Button variant="secondary" size="sm" onClick={()=>{displayInfosStation("Station de Carrefour")}}>Plus d'infos</Button></td>
        </tr>
        <tr>
            <td>Station de Carrefour - Antibes - adresse</td>
            <td>SP95-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td>SP98-1.702 <FontAwesomeIcon icon={faChevronDown} color={"green"}/></td>
            <td>Diesel-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td><FontAwesomeIcon icon={faStar}/></td>
            <td><Badge pill bg="danger">
                Fermée
            </Badge></td>
            <td><Button variant="secondary" size="sm" onClick={()=>{displayInfosStation("Station de Carrefour")}}>Plus d'infos</Button></td>
        </tr>
        <tr>
            <td>Station de Carrefour - Antibes - adresse</td>
            <td>SP95-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td>SP98-1.702 <FontAwesomeIcon icon={faChevronDown} color={"green"}/></td>
            <td>Diesel-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td><FontAwesomeIcon icon={faStar}/></td>
            <td><Badge pill bg="danger">
                Fermée
            </Badge></td>
            <td><Button variant="secondary" size="sm" onClick={()=>{displayInfosStation("Station de Carrefour")}}>Plus d'infos</Button></td>
        </tr>
        <tr>
            <td>Station de Carrefour - Antibes - adresse</td>
            <td>SP95-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td>SP98-1.702 <FontAwesomeIcon icon={faChevronDown} color={"green"}/></td>
            <td>Diesel-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td><FontAwesomeIcon icon={faStar}/></td>
            <td><Badge pill bg="danger">
                Fermée
            </Badge></td>
            <td><Button variant="secondary" size="sm" onClick={()=>{displayInfosStation("Station de Carrefour")}}>Plus d'infos</Button></td>
        </tr>
        <tr>
            <td>Station de Carrefour - Antibes - adresse</td>
            <td>SP95-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td>SP98-1.702 <FontAwesomeIcon icon={faChevronDown} color={"green"}/></td>
            <td>Diesel-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td><FontAwesomeIcon icon={faStar}/></td>
            <td><Badge pill bg="danger">
                Fermée
            </Badge></td>
            <td><Button variant="secondary" size="sm" onClick={()=>{displayInfosStation("Station de Carrefour")}}>Plus d'infos</Button></td>
        </tr>
        </tbody>
        </Table>
            <CanvasInfosEssence ref={childRef} nameStation={nameStation}/>
        </>
    );
};

export default ListEssence;
