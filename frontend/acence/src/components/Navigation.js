import { NavLink } from "react-router-dom";
const Navigation = () => {




    function UserNav() {
        return <ul>
        <li><NavLink onClick={window.location.reload} to="/">Home</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/favoris">Favoris</NavLink></li>
        <li><NavLink onClick={""}  to="/">Disconnect</NavLink></li>
        </ul>
      }
      
    function GuestNav() {
        return <ul>
        <li><NavLink onClick={window.location.reload} to="/">Home</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/login">Log in</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/signup">Sign up</NavLink></li>
        </ul>
    }

    function Nav() {
        if(localStorage.getItem("xsrfToken") && localStorage.getItem("accessTokenExpires") && localStorage.getItem("refreshTokenExpires")){
          return <UserNav />;
        }
        return <GuestNav />;
    }

   

    return (
        <div className="navigation">
            <img className="logo" src="" alt="Acence" />
            <h1 className="company" id="company">Acence</h1>
            <Nav />
        </div>
        
    );
};

export default Navigation;