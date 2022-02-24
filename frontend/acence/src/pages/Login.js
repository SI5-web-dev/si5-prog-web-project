import { NavLink } from 'react-router-dom';
import * as utils from "../Utils";

let pathUrl =  window.location
let hostname = "";
if(pathUrl.origin === "http://localhost:3000"){
    hostname =  "http://localhost:4000";
}

const Login = () => {

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
        <div id="login" className="login">
            <div className="blurLogin">
            <h1>Welcome !</h1>
            <h2>Log in to your account</h2>
            <div className="box1">
                <div className="phTitle" >Email address</div>
                <input className="ph" id="mail" placeholder="example@mail.com"></input>
            </div>
            <div className="box2">
                <div className="phTitle">Password</div>
                <input type="password" id="mdp" className="ph" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"></input>
            </div>
            <button className="signin" onClick={login}>Log in</button>
            <div className="or">Or</div>
            <NavLink to="/signup"><button className="signup">Sign up</button></NavLink>
            </div>
        </div>
    );
};

export default Login;
