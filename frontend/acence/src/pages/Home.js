import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import * as Utils from "./../Utils"
import {Button ,ToggleButton,ToggleButtonGroup, Form, FormControl, ButtonGroup} from 'react-bootstrap';
import {Container, Row} from "reactstrap";
import Map from "../components/Map";
import ListEssence from "../components/ListEssence";

function Home(){

    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState();
    const handleChange = (val) => setValue(val);



    function requestProximity(){
        let location = document.getElementById("location").value;
        let Gazole=false;
        let SP95E10=false;
        let SP98=false;
        let SP95=false;
        let GPLc=false;
        let E85=false;

        if(document.getElementById("Gazole").checked){Gazole = true;}
        if(document.getElementById("SP95-E10").checked){SP95E10 = true;}
        if(document.getElementById("SP98").checked){SP98 = true;}
        if(document.getElementById("SP95").checked){SP95 = true;}
        if(document.getElementById("GPLc").checked){GPLc = true;}
        if(document.getElementById("E85").checked){E85 = true;}
        let request = JSON.stringify({'location':location,'Gazole':Gazole,'SP95E10':SP95E10,'SP98':SP98,'SP95':SP95,'GPLc':GPLc,'E85':E85})
        console.log(request)
        Utils.default.sendRequest('POST','/querys/proximity',request,createSettings)

    }

    function requestCheapest(){
        let location = document.getElementById("location").value;
        let Gazole=false;
        let SP95E10=false;
        let SP98=false;
        let SP95=false;
        let GPLc=false;
        let E85=false;

        if(document.getElementById("Gazole").checked){Gazole = true;}
        if(document.getElementById("SP95-E10").checked){SP95E10 = true;}
        if(document.getElementById("SP98").checked){SP98 = true;}
        if(document.getElementById("SP95").checked){SP95 = true;}
        if(document.getElementById("GPLc").checked){GPLc = true;}
        if(document.getElementById("E85").checked){E85 = true;}
        let request = JSON.stringify({'location':location,'Gazole':Gazole,'SP95E10':SP95E10,'SP98':SP98,'SP95':SP95,'GPLc':GPLc,'E85':E85})

        Utils.default.sendRequest('POST','/querys/cheapest',request,createSettings)

    }

    function createSettings(response){
        console.log(response)
        //tranche de prix
        let prix = document.getElementById('prix')
        prix.min = 0;
        prix.max = 20;
        prix.value =10;
        let nbService=[];
        //services
        let services = document.getElementById('services');
        for(let i = 0 ; i<nbService.length;i++){
            let service = nbService[i];
            let checkbox = document.createElement('input');
            let label = document.createElement('label');
            checkbox.type = "checkbox" ;
            checkbox.id = service;
            checkbox.name = service;
            label.htmlFor= service;
            label.innerHTML = service;
            services.appendChild(checkbox)
            services.appendChild(label)
        }
    }

    function enableButtons(){
        if(document.getElementById("location").value!=="" ){
            document.getElementById('buttonProximity').disabled = false;
            document.getElementById('buttonProximity').onclick=requestProximity;
            document.getElementById('buttonCheapest').disabled = false;
            document.getElementById('buttonCheapest').onclick=requestCheapest;
        }else{
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
                    </Row>
                </Container>
            </div>
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

                <div id="researchSettings">
                    <input type="checkbox" id="ouverte" name="ouverte" defaultChecked />
                    <label htmlFor="ouverte">Ouverte</label>
                    <br/>
                    Prix<br/><input type='range' id="prix" min="0" max="10"></input>
                    <div id="services">

                    </div>
                </div>
        <Map/>
            <ListEssence/>
        </div>

    )
}

export default Home;
