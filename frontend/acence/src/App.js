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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (

    <Router>
      <Navigation />
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
