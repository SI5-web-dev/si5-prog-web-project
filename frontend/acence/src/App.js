import logo from './logo.svg';

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <Router>
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
