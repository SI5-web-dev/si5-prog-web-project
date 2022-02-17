import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import * as Utils from "./../Utils"
import { Button, ToggleButton, ToggleButtonGroup, Form, FormControl, ButtonGroup } from 'react-bootstrap';
import { Container, Row } from "reactstrap";
import Map from "../components/Map";
import ListEssence from "../components/ListEssence";

function Home() {

    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState();
    const [listPoint, setListPoint] = useState([]);
    const handleChange = (val) => setValue(val);
    let listService = [];
    let servicesOcurrence = [];
    let stationMap = [];
    let servicesChecked = [];

    const [location,setLocation] = useState("");

    function requestProximity() {
        let location = document.getElementById("location").value;
        setLocation(location);
        let Gazole = false;
        let SP95E10 = false;
        let SP98 = false;
        let SP95 = false;
        let GPLc = false;
        let E85 = false;

        if (document.getElementById("Gazole").checked) { Gazole = true; }
        if (document.getElementById("SP95-E10").checked) { SP95E10 = true; }
        if (document.getElementById("SP98").checked) { SP98 = true; }
        if (document.getElementById("SP95").checked) { SP95 = true; }
        if (document.getElementById("GPLc").checked) { GPLc = true; }
        if (document.getElementById("E85").checked) { E85 = true; }
        let request = JSON.stringify({ 'location': location, 'Gazole': Gazole, 'SP95E10': SP95E10, 'SP98': SP98, 'SP95': SP95, 'GPLc': GPLc, 'E85': E85 })

        Utils.default.sendRequest('POST', '/querys/proximity', request, createSettings)

    }

    function requestCheapest() {
        let location = document.getElementById("location").value;
        setLocation(location);
        let Gazole = false;
        let SP95E10 = false;
        let SP98 = false;
        let SP95 = false;
        let GPLc = false;
        let E85 = false;

        if (document.getElementById("Gazole").checked) { Gazole = true; }
        if (document.getElementById("SP95-E10").checked) { SP95E10 = true; }
        if (document.getElementById("SP98").checked) { SP98 = true; }
        if (document.getElementById("SP95").checked) { SP95 = true; }
        if (document.getElementById("GPLc").checked) { GPLc = true; }
        if (document.getElementById("E85").checked) { E85 = true; }
        let request = JSON.stringify({ 'location': location, 'Gazole': Gazole, 'SP95E10': SP95E10, 'SP98': SP98, 'SP95': SP95, 'GPLc': GPLc, 'E85': E85 })

        Utils.default.sendRequest('POST', '/querys/cheapest', request, createSettings)

    }
    // callback de la requete au serveur
    function createSettings(response) {
        if(JSON.parse(response).status !== "200"){
            alert(JSON.parse(response).message)
            return
        }
        response = JSON.parse(response).list
        stationMap = response;
        createServicesList();
        //tranche de prix
        let prix = document.getElementById('prix');

        prix.min = 0;
        prix.max = 20;
        prix.value = 10;
        //services
        let services = document.getElementById('services');
        services.innerHTML = "";
        for (let i = 0; i < listService.length; i++) {
            let service = listService[i];
            let nbOfThis = servicesOcurrence[i];
            let checkbox = document.createElement('input');
            let label = document.createElement('label');
            checkbox.type = "checkbox";
            checkbox.id = service;
            checkbox.checked = true;
            checkbox.name = service;
            checkbox.onchange = getServicesChecked;
            label.htmlFor = service;
            label.innerHTML = '&nbsp;&nbsp;&nbsp;' + service + ' (' + nbOfThis + ')';
            services.appendChild(checkbox)
            services.appendChild(label)
            let br = document.createElement('br');
            services.appendChild(br)
        }
        document.getElementById("checkAll").onclick = checkAll;
        document.getElementById("unCheckAll").onclick = unCheckAll;
        getServicesChecked();
        createListPoint();
    }

    // creer la liste de points a afficher sur la map en fonction des services checkés
    function createListPoint() {
        let listPoints = [];
        stationMap.forEach(station => {
            if ("object" === typeof station.services.service) {
                for (let i = 0; i < station.services.service.length; i++) {
                    let service = station.services.service[i];
                    if (servicesChecked.includes(service)) {
                        const latitude = parseFloat(station["@latitude"]) / 100000;
                        const longitude = parseFloat(station["@longitude"]) / 100000;
                        const adresse = station["adresse"];
                        const ville = station["ville"];
                        const codePostal = station["@cp"];
                        const services = station["services"];
                        const horaires = station["horaires"];
                        const prix = station["prix"];
                        listPoints.push([latitude, longitude, adresse, ville, codePostal, services, horaires , prix]);
                        break;
                    }
                }
            } else {
                if (servicesChecked.includes(station.services.service)) {
                    const latitude = parseFloat(station["@latitude"]) / 100000;
                    const longitude = parseFloat(station["@longitude"]) / 100000;
                    const adresse = station["adresse"];
                    const ville = station["ville"];
                    const codePostal = station["@cp"];
                    const services = station["services"];
                    const horaires = station["horaires"];
                    const prix = station["prix"];
                    listPoints.push([latitude, longitude, adresse, ville, codePostal, services, horaires , prix]);
                }
            }
        });
        setListPoint(listPoints);
    }

    // creer la liste des services et leurs occurences 
    function createServicesList() {
        let services = [];
        listService = [];
        servicesOcurrence = [];
        stationMap.forEach(station => {
            if (station.services === null) {
                station.services = { service: ["Aucun service"] } ;
            }
            if ("object" === typeof station.services.service) {
                station.services.service.forEach(service => {
                    services.push(service);
                    if (!listService.includes(service)) {
                        listService.push(service)
                        servicesOcurrence.push(0);
                    }
                })
            } else {
                services.push(station.services.service);
                if (!listService.includes(station.services.service)) {
                    listService.push(station.services.service)
                    servicesOcurrence.push(0);
                }
            }
        })
        services.forEach(service => {
            servicesOcurrence[listService.indexOf(service)]++;
        })
    }

    // recupère la liste des services checkés
    function getServicesChecked() {
        servicesChecked = []
        listService.forEach(service => {
            if (document.getElementById(service).checked) {
                servicesChecked.push(service);
            }
        })
        createListPoint();
    }
    function checkAll() {
        listService.forEach(service => {
            document.getElementById(service).checked = true;
        })
        getServicesChecked();
    }

    function unCheckAll() {
        listService.forEach(service => {
            document.getElementById(service).checked = false;
        })
        getServicesChecked();
    }

    function enableButtons() {
        if (document.getElementById("location").value !== "") {
            document.getElementById('buttonProximity').disabled = false;
            document.getElementById('buttonProximity').onclick = requestProximity;
            document.getElementById('buttonCheapest').disabled = false;
            document.getElementById('buttonCheapest').onclick = requestCheapest;
        } else {
            document.getElementById('buttonProximity').disabled = true;
            document.getElementById('buttonCheapest').disabled = true;
        }
    }


    return (
        <div className="Home">
            <div>
                <Container>
                    <Row className="justify-content-center text-center">
                        <h3>Trouver une station essence</h3>
                        <Form>
                            <FormControl
                                type="search"
                                placeholder="Dans quelle ville voulez-vous trouver votre station essence?"
                                className="me-2"
                                aria-label="Search"
                                id="location"
                                onChange={enableButtons}
                            />

                        </Form>
                        <div>
                            <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                                <ToggleButton id="Gazole" value="Gazole">
                                    Gazole
                                </ToggleButton>
                                <ToggleButton id="SP95-E10" value="SP95-E10">
                                    SP95-E10
                                </ToggleButton>
                                <ToggleButton id="SP98" value="SP98">
                                    SP98
                                </ToggleButton>
                                <ToggleButton id="SP95" value="SP95">
                                    SP95
                                </ToggleButton>
                                <ToggleButton id="GPLc" value="GPLc">
                                    GPLc
                                </ToggleButton>
                                <ToggleButton id="E85" value="E85">
                                    E85
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div>
                            <Button variant="secondary" className="m-2" id="buttonProximity" onClick={requestProximity} disabled>Rechercher la plus proche</Button>
                            <Button variant="secondary" className="m-2" id="buttonCheapest" onClick={requestCheapest} disabled>Rechercher la moins chère</Button>
                        </div>
                    </Row>
                </Container>
            </div>
            <div className="researchSettings" id="researchSettings">
                <input type="checkbox" id="ouverte" name="ouverte" defaultChecked />
                <label htmlFor="ouverte">Ouverte</label>
                <br />
                Prix<br /><input type='range' id="prix" min="0" max="10"></input>
                <button className="m-2" id="checkAll" >Tout cocher</button>
                <button className="m-2" id="unCheckAll" >Tout décocher</button>
                <div id="services">

                </div>
            </div>
            <Map list={listPoint} location={location}/>
            <ListEssence list={listPoint} />
        </div>

    )
}

export default Home;
