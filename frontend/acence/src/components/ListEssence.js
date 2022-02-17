import { Table, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useRef } from "react";
import CanvasInfosEssence from "./CanvasInfosEssence";

const ListEssence = (props) => {

    const childRef = useRef();

    const [nameStation, setNameStation] = useState(0);
    const [codePostal, setCodePostal] = useState(0);
    const [ville, setVille] = useState("");

    function displayInfosStation(station,ville,codePostal) {
        setNameStation(station);
        setCodePostal(codePostal);
        setVille(ville);
        childRef.current.getAlert();
    }

    function CreateList() {
        return (
            props.list.map(station => {
                return (
                    <tr key={Math.random().toString(36).substring(2, 11)}>
                        <td><b>{station[2]} , {station[4]} {station[3]}</b></td>
                        {/* <td>{station[3]}</td>
                        <td>{station[4]}</td> */}
                        <td><Button variant="secondary" size="sm" onClick={()=>{displayInfosStation(station[2] , station[3] , station[4])}}>Plus d'infos</Button></td>
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
            list={props.list}/>
        </div>
    );
};

export default ListEssence;
