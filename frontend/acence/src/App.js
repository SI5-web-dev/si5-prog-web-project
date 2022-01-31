import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import Navigation from "./components/Navigation";

function App() {
  return (

    <Router>
      <Navigation />
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" element={<Home/>}>
        </Route>
        <Route path="/home" element={<Home/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
