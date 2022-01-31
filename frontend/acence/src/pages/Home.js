
import Navigation from "../components/Navigation";
import React, { useState } from 'react';
import {Button , ButtonGroup ,ToggleButton, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
function Home(){

    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    const radiosEssence = [
        { name: 'Gazole', value: 'Gazole' },
        { name: 'SP95-E10', value: 'SP95-E10' },
        { name: 'SP98', value: 'SP98' },
        { name: 'SP95', value: 'SP95' },
        { name: 'GPLc', value: 'GPLc' },
        { name: 'E85', value: 'E85' },
      ];





    function createSettings(){
        //tranche de prix
        let prix = document.getElementById('prix')
        prix.min = 0;
        prix.max = 20;
        prix.value =10;
        let nbService=[];
        //services
        let services = document.getElementById('services');
        for(let i = 0 ; i<nbService.size();i++){
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
        

    return (
        <div className="Home">
            <Navigation />
            <h1>Trouver une station essence</h1>
            <FontAwesomeIcon icon={faCoffee} />
            <br />
            <input placeholder="Dans quelle ville voulez-vous trouver votre station essence ?"/>
        
            <br />
            <div>
                {radiosEssence.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    className="m-2"
                    size="lg"
                    variant={'secondary' }
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}>   
                    {radio.name}
                </ToggleButton>
                ))}
                </div>
                <br />
                <Button variant="primary" className="m-2" onClick={createSettings}>Rechercher la plus proche</Button>{}
                <Button variant="primary" className="m-2" onClick={createSettings}>Rechercher la moins chère</Button>{}
                <div id="researchSettings">
                    <input type="checkbox" id="ouverte" name="ouverte" defaultChecked />
                    <label htmlFor="ouverte">Ouverte</label>
                    <input type='range' id="prix" min="0" max="10"></input>
                    <div id="services">

                    </div>
                </div>
        </div>

    )
}

export default Home;
