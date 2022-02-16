import { Table, Badge, Button } from "react-bootstrap";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons'
import { useRef } from "react";
import CanvasInfosEssence from "./CanvasInfosEssence";

const ListEssence = (props) => {

    const childRef = useRef();

    const [nameStation, setNameStation] = useState(0);

    function displayInfosStation(station) {
        setNameStation(station);
        childRef.current.getAlert();
    }

    function CreateList() {
        return (
            props.list.map(station => {
                return (
                    <tr key={Math.random().toString(36).substring(2, 11)}>
                        <td>{station[2]}</td>
                        <td>{station[3]}</td>
                        <td>{station[4]}</td>
                        <td><Button variant="secondary" size="sm" onClick={()=>{displayInfosStation("Station de Carrefour")}}>Plus d'infos</Button></td>
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
            <CanvasInfosEssence ref={childRef} nameStation={nameStation} />
        </div>
    );
};

export default ListEssence;
