import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import * as Utils from "./../Utils";
import axios from 'axios';
import { Button, ToggleButton, ToggleButtonGroup, Form, FormControl } from 'react-bootstrap';
import { Container, Row } from "reactstrap";
import Map from "../components/Map";
import ListEssence from "../components/ListEssence";
function Home() {

    const [proximity, setProximity] = useState(true);
    const [value, setValue] = useState();
    const [listPoint, setListPoint] = useState([]);
    const handleChange = (val) => setValue(val);

    let listService = [];
    let servicesOcurrence = [];
    let stationMap = [];
    let servicesChecked = [];
    let latitudeClient;
    let longitudeClient;
    let essenceChoosed="Gazole";
    let prixMin = 10000;
    let prixMax = 0;

    const [location,setLocation] = useState("");

    function getPostionForInput(){
        const apiKey = '5b3ce3597851110001cf62481afd335205604f6f82b586bc039f1b78';
        navigator.geolocation.getCurrentPosition((ta)=>{
            latitudeClient = ta.coords.latitude;
            longitudeClient = ta.coords.longitude;
            const url = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${ta.coords.latitude}&lon=${ta.coords.longitude}&api_key=${apiKey}`;
            axios.get(url).then((res) => {
            let resultat = JSON.parse(res.request.response).address
            document.getElementById("location").value = resultat.road +" "+resultat.quarter+" "+resultat.postcode+" "+resultat.city;
        });
        



        });
    }

    function requestProximity() {
        setProximity(true);
        let location = document.getElementById("location").value;
        const apiKey = '5b3ce3597851110001cf62481afd335205604f6f82b586bc039f1b78';
        const url = `http://nominatim.openstreetmap.org/search?q=${location}&format=json&polygon=1&addressdetails=1&api_key=${apiKey}`;
        axios.get(url).then((res) => {
            let resultat = JSON.parse(res.request.response)[0]
            let long = resultat.lon;
            let lat = resultat.lat;
            //latitudeClient= lat;
            //longitudeClient=long;
            navigator.geolocation.getCurrentPosition((ta)=>{
                latitudeClient = ta.coords.latitude;
                longitudeClient = ta.coords.longitude;
            });
            setLocation(location);
            let Gazole = false;
            let SP95E10 = false;
            let SP98 = false;
            let SP95 = false;
            let GPLc = false;
            let E85 = false;

            if (document.getElementById("Gazole").checked) { Gazole = true; essenceChoosed="Gazole";}
            else if (document.getElementById("SP95-E10").checked) { SP95E10 = true; essenceChoosed="SP95-E10";}
            else if (document.getElementById("SP98").checked) { SP98 = true;essenceChoosed="SP98"; }
            else if (document.getElementById("SP95").checked) { SP95 = true; essenceChoosed="SP95";}
            else if (document.getElementById("GPLc").checked) { GPLc = true; essenceChoosed="GPLc";}
            else if (document.getElementById("E85").checked) { E85 = true;essenceChoosed="E85"; }
            let request = JSON.stringify({ 'latitude': lat,'longitude':long, 'Gazole': Gazole, 'SP95E10': SP95E10, 'SP98': SP98, 'SP95': SP95, 'GPLc': GPLc, 'E85': E85 })
            
            Utils.default.sendRequest('POST', '/querys/askStation', request, createSettings)
        });
            
        


    }

    function requestCheapest() {
        setProximity(false);
        let location = document.getElementById("location").value;
        const apiKey = '5b3ce3597851110001cf62481afd335205604f6f82b586bc039f1b78';
        const url = `http://nominatim.openstreetmap.org/search?q=${location}&format=json&polygon=1&addressdetails=1&api_key=${apiKey}`;
        axios.get(url).then((res) => {
            let resultat = JSON.parse(res.request.response)[0]
            let long = resultat.lon;
            let lat = resultat.lat;
            latitudeClient= lat;
            longitudeClient=long;
            setLocation(location);
            let Gazole = false;
            let SP95E10 = false;
            let SP98 = false;
            let SP95 = false;
            let GPLc = false;
            let E85 = false;

            if (document.getElementById("Gazole").checked) { Gazole = true; essenceChoosed="Gazole";}
            else if (document.getElementById("SP95-E10").checked) { SP95E10 = true; essenceChoosed="SP95-E10";}
            else if (document.getElementById("SP98").checked) { SP98 = true;essenceChoosed="SP98"; }
            else if (document.getElementById("SP95").checked) { SP95 = true; essenceChoosed="SP95";}
            else if (document.getElementById("GPLc").checked) { GPLc = true; essenceChoosed="GPLc";}
            else if (document.getElementById("E85").checked) { E85 = true;essenceChoosed="E85"; }
            let request = JSON.stringify({ 'latitude': lat,'longitude':long, 'Gazole': Gazole, 'SP95E10': SP95E10, 'SP98': SP98, 'SP95': SP95, 'GPLc': GPLc, 'E85': E85 })
            
            Utils.default.sendRequest('POST', '/querys/askStation', request, createSettingsCheapest)

        })
    }

    function getDistance(lat1,lon1,lat2,lon2){
        lat1 = parseFloat(lat1);
        lon1 = parseFloat(lon1);
        lat2 = parseFloat(lat2);
        lon2 = parseFloat(lon2);

        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres
        return d/1000;
    }

    
    function createSettingsCheapest(response) {
        if(JSON.parse(response).status !== "200"){
            alert(JSON.parse(response).message)
            return
        }
        response = JSON.parse(response).list
        stationMap = response;
        createServicesList();
        //services
        let services = document.getElementById('services');
        services.innerHTML = "";
        document.getElementById('ouverte').onchange = getServicesChecked;
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

        //Displaying the hidden table
        let header = document.querySelector("#table");
        header.style.display = "block";
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
        //services
        let services = document.getElementById('services');
        services.innerHTML = "";
        document.getElementById('ouverte').onchange = getServicesChecked;
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
        document.getElementById("prix").onchange = getServicesChecked;
        document.getElementById("checkAll").onclick = checkAll;
        document.getElementById("unCheckAll").onclick = unCheckAll;
        getServicesChecked();
        createListPoint();

        //Displaying the hidden table
        let header = document.querySelector("#table");
        header.style.display = "block";
    }

    // creer la liste de points a afficher sur la map en fonction des services checkés
    function createListPoint() {
        let listPoints = [];
        let thisDay = getDay();
        let thisHour = getHour();
        let thisMinute = getMinutes();
        let prixMaximumChoisit = document.getElementById("prix").value;
        stationMap.forEach(station => {
            if((document.getElementById('ouverte').checked && stationOuverte(station.horaires,thisDay,thisHour,thisMinute))|| !document.getElementById('ouverte').checked){
                if ("object" === typeof station.services.service) {
                    for (let i = 0; i < station.services.service.length; i++) {
                        let service = station.services.service[i];
                        if (servicesChecked.includes(service)) {
                            const distance = getDistance(parseFloat(station["@latitude"]) / 100000,parseFloat(station["@longitude"]) / 100000,latitudeClient,longitudeClient);
                            const latitude = parseFloat(station["@latitude"]) / 100000;
                            const longitude = parseFloat(station["@longitude"]) / 100000;
                            const adresse = station["adresse"];
                            const ville = station["ville"];
                            const codePostal = station["@cp"];
                            const services = station["services"];
                            const horaires = station["horaires"];
                            const prix = station["prix"];
                            let prixChosit;
                            for(let i =0 ; i<station["prix"].length;i++){
                                if(station["prix"][i]["@nom"]===essenceChoosed){
                                    prixChosit = station["prix"][i];
                                    
                                    break;
                                }
                            }
                            if(parseFloat(prixChosit["@valeur"])<=prixMaximumChoisit){
                                listPoints.push([latitude, longitude, adresse, ville, codePostal, services, horaires , prix,distance,prixChosit]);
                            }
                            break;
                        }
                    }
                } else {
                    if (servicesChecked.includes(station.services.service)) {
                        const distance = getDistance(parseFloat(station["@latitude"]) / 100000,parseFloat(station["@longitude"]) / 100000,latitudeClient,longitudeClient);
                        const latitude = parseFloat(station["@latitude"]) / 100000;
                        const longitude = parseFloat(station["@longitude"]) / 100000;
                        const adresse = station["adresse"];
                        const ville = station["ville"];
                        const codePostal = station["@cp"];
                        const services = station["services"];
                        const horaires = station["horaires"];
                        const prix = station["prix"];
                        let prixChosit;
                            for(let i =0 ; i<station["prix"].length;i++){
                                if(station["prix"][i]["@nom"]===essenceChoosed){
                                    prixChosit = station["prix"][i];
                                    break;
                                }
                            }
                            if(parseFloat(prixChosit["@valeur"])<=prixMaximumChoisit){
                                listPoints.push([latitude, longitude, adresse, ville, codePostal, services, horaires , prix,distance,prixChosit]);
                            }
                        
                    }
                }
            }
        });


        setListPoint(listPoints);
    }
    // vérifie si la station est ouverte selon les horaires
    function stationOuverte(horaires,day,hour,minute){
        if(horaires!==undefined){
            for(let i = 0; i<horaires.jour.length;i++){
                if(horaires.jour[i]["@id"]===day.toString()){
                    //if(horaires.jour[i]["@ferme"]!=="1"){
                        if(typeof horaires.jour[i]["horaire"] === "object"){
                            let ouverture = horaires.jour[i]["horaire"]["@ouverture"];
                            let fermeture = horaires.jour[i]["horaire"]["@fermeture"];
                            if(ouverture!==fermeture){
                                if(hour>=parseInt(ouverture.split(".")[0]) && hour<parseInt(fermeture.split(".")[0])){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                            return true;
                        }
                        return false;
                    //}
                    //return false;
                }
            }
        }
        return false;
    }

    function getMinutes(){
        let minuteActuelle = new Date();
        return minuteActuelle.getMinutes();
    }

    function getHour(){
        let heureActuelle = new Date();
        return heureActuelle.getHours();
    }

    function getDay(){
        let jourActuel = new Date();
        return jourActuel.getDay()
    }
    // creer la liste des services et leurs occurences
    function createServicesList() {
        let services = [];
        listService = [];
        servicesOcurrence = [];
        stationMap.forEach(station => {
            
            for(let i =0 ; i<station["prix"].length;i++){
                if(station["prix"][i]["@nom"]===essenceChoosed){
                    let prixChosit = station["prix"][i];
                    if(parseFloat(prixChosit["@valeur"])<prixMin) prixMin = parseFloat(prixChosit["@valeur"]);
                    if(parseFloat(prixChosit["@valeur"])>prixMax) prixMax = parseFloat(prixChosit["@valeur"]);
                    break;
                }
            }
            document.getElementById("prix").min = prixMin;
            document.getElementById("prix").max = prixMax;
            document.getElementById("prix").value = prixMax;
            document.getElementById("minimum").innerHTML = prixMin;
            document.getElementById("maximum").innerHTML = prixMax;
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
                            /><img className="target" alt="" src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-target-interface-kiranshastry-lineal-kiranshastry.png" onClick={getPostionForInput}/>

                        </Form>

                        <div>
                            <ToggleButtonGroup type="radio" value={value} name="options" onChange={handleChange} defaultValue="Gazole">
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
                            <Button variant="secondary" className="m-2" id="buttonProximity" onClick={requestProximity}>Rechercher la plus proche</Button>

                            <Button variant="secondary" className="m-2" id="buttonCheapest" onClick={requestCheapest}>Rechercher la moins chère</Button>
                        </div>
                    </Row>
                </Container>
            </div>
            <div className="researchSettings" id="researchSettings">
                <input type="checkbox" id="ouverte" name="ouverte"  />
                <label htmlFor="ouverte">&nbsp;&nbsp;&nbsp;Ouverte</label>
                <br />
                Prix : 
                <br />
                <span id="minimum"></span><input type="range" id="prix" min="0" max="100" step="0.001" ></input><span id="maximum"></span>
                <br />
                <button className="m-2" id="checkAll" >Tout cocher</button>
                <button className="m-2" id="unCheckAll" >Tout décocher</button>
                <div id="services">

                </div>
            </div>
            <Map list={listPoint} location={location} />
            <ListEssence list={listPoint} search={proximity}/>
        </div>

    )
}

export default Home;
