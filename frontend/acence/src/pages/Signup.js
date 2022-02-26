import React, { useState, useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";
import * as utils from "../Utils";
import { Button, ToggleButton, ToggleButtonGroup, Form, FormControl } from 'react-bootstrap';
let pathUrl = window.location
let hostname = "";
if (pathUrl.origin === "http://localhost:3000") {
    hostname = "http://localhost:4000";
}

const Signup = () => {
    const { theme } = useContext(ThemeContext);

    function createAccount() {
        let mail = document.getElementById('mail').value;
        let mdp1 = document.getElementById('mpd1').value;
        let mdp2 = document.getElementById('mpd2').value;
        let surname = document.getElementById('surname').value;
        let name = document.getElementById('name').value;

        if (mdp1 === mdp2) {
            sendRequestSignUp(mail, mdp1, name, surname);
            console.log("c bon")
        }
        else {
            alert("Les mots de passes ne correspondent pas");
        }
    }

    function sendRequestSignUp(mail, mdp, name, surname) {
        let data = JSON.stringify({ "email": mail, "password": mdp, "name": name, "surname": surname })
        console.log(data)
        utils.default.sendRequest('POST', "/user/signup", data, callbackSignup);
    }

    function callbackSignup(response) {
        let res = JSON.parse(response).message
        if (res === "Votre compte a bien été créé !") {
            alert(res);
            window.location = "/login"
        } else {
            alert(res)
        }
    }
    return (
        <div className={`signup ${theme}`}>
            <div className="blurSignup">
                <h1>Bienvenue !</h1>
                <h2>Enregistrez-vous pour créer une compte</h2>
                <div className="box1">
                    <div className="phTitle" >Nom</div>
                    <input className="ph" id="name" placeholder="ex : Alexandre"></input>
                </div>
                <div className="box1">
                    <div className="phTitle" >Prénom</div>
                    <input className="ph" id="surname" placeholder="ex : Dubois"></input>
                </div>
                <div className="box1">
                    <div className="phTitle" >Addresse mail</div>
                    <input className="ph" id="mail" placeholder="example@mail.com"></input>
                </div>
                <div className="box2">
                    <div className="phTitle">Mot de passe</div>
                    <input type="password" id="mpd1" className="ph" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"></input>
                </div>
                <div className="box3">
                    <div className="phTitle">Confirmation mot de passe</div>
                    <input type="password" id="mpd2" className="ph" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"></input>
                </div>
                <br />
                <p className="msg" id="msg"></p>
                <Button variant="secondary" className="signup" onClick={createAccount}>S'enregistrer</Button>
                
            </div>
        </div>
    );
};

export default Signup;