import {Navbar, Nav} from "react-bootstrap";
const Navigation = () => {

    function UserNav() {
        return <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/favoris">Favoris</Nav.Link>
            <Nav.Link href="/">Deconnexion</Nav.Link>
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
        if(localStorage.getItem("xsrfToken") && localStorage.getItem("accessTokenExpires") && localStorage.getItem("refreshTokenExpires")){
          return <UserNav />;
        }
        return <GuestNav />;
    }



    return (
            <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/" className="m-1">ACEnce.com</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Tab/>
                </Navbar.Collapse>
            </Navbar>
    );
};

export default Navigation;
