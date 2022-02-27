import { NavLink } from 'react-router-dom';
import * as utils from "../Utils";
import React, { useState , useContext} from 'react';
import {ThemeContext} from "../context/ThemeContext";
import { Button, ToggleButton, ToggleButtonGroup, Form, FormControl } from 'react-bootstrap';


const Login = () => {
    const { theme } = useContext(ThemeContext);

    function login(){
        let mail  = document.getElementById('mail').value;
        let mdp  = document.getElementById('mdp').value;
        sendRequestLogin(mail,mdp);
    }

    function sendRequestLogin(mail, mdp) {
        let data = JSON.stringify({"email":mail,"password":mdp})
        console.log(data)
        utils.default.sendRequest('POST',"/user/login",data,callbackLogIn);
    }

    function callbackLogIn(response){
        let res = JSON.parse(response).message
        if(res==="Vous êtes connecté !"){
            localStorage.setItem("token",JSON.parse(response).uid);
            localStorage.setItem("favoriteStations",JSON.stringify(JSON.parse(response).favoriteStations));
            alert(res);
            window.location="/"
        }else{
            alert(res)
        }
    }
    return (
        <div id="login" className={`login ${theme}`}>
            <div className="blurLogin">
            <h1>Bienvenue !</h1>
            <h2>Connectez-vous à votre compte</h2>
            <div className="box1">
                <div className="phTitle" >Adresse mail</div>
                <input className={`ph ${theme}`} id="mail" placeholder="example@mail.com"></input>
            </div>
            <div className="box2">
                <div className="phTitle">Mot de passe</div>
                <input type="password" id="mdp" className={`ph ${theme}`} placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"></input>
            </div>
            <Button variant="secondary" className="signin"  onClick={login}>Se connecter</Button>
        
            <div className="or">ou</div>
            <NavLink to="/signup"><Button variant="secondary" className="signup" >S'inscrire</Button></NavLink>
            </div>
        </div>
    );
};

export default Login;
