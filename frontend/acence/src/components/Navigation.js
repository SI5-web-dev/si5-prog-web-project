import {Navbar, Nav} from "react-bootstrap";
import {ToggleModeNight} from "./ToggleModeNight";
const Navigation = () => {
    window.onload = () => {
        let theme = localStorage.getItem("token")
        console.log(theme)
        if(theme !== "dark"){
            document.body.style.backgroundColor = "#282c35"
        }else{
            document.body.style.backgroundColor = "white"
        }
        
    }

    function UserNav() {
        return <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/favoris">Favoris</Nav.Link>
            <Nav.Link onClick={deleteToken} href="/">Deconnexion</Nav.Link>
        </Nav>
      }

    function GuestNav() {
        return <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/login">Se connecter</Nav.Link>
            <Nav.Link href="/signup">S'inscrire</Nav.Link>
        </Nav>
    }

    function Tab() {
        if(localStorage.getItem("token")){
          return <UserNav />;
        }
        return <GuestNav />;
    }

    function deleteToken(){
        localStorage.removeItem("token");
        localStorage.removeItem("favoriteStations");

        window.location.href = "/";
    }


    return (
            <Navbar bg="dark" className="navigation" variant="dark" expand="lg">
                    <Navbar.Brand href="/" className="m-1">ACEnce.com</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Tab/>
                    <ToggleModeNight/>
                </Navbar.Collapse>
            </Navbar>
    );
};

export default Navigation;
