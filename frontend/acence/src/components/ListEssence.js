import {Table, Badge} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons'

const ListEssence = () => {

    return (
        <Table responsive="sm">
        <tbody>
        <tr onClick={() =>console.log("affiche la page")}>
            <td>Station de Carrefour - Antibes - adresse</td>
            <td>SP95-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td>SP98-1.702 <FontAwesomeIcon icon={faChevronDown} color={"green"}/></td>
            <td>Diesel-1.702 <FontAwesomeIcon icon={faChevronUp} color={"red"}/></td>
            <td><FontAwesomeIcon icon={faStar}/></td>
            <td><Badge pill bg="danger">
                Fermée
            </Badge></td>
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
        </tr>
        </tbody>
        </Table>
    );
};

export default ListEssence;
