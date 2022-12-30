import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Home from "./HomeFiles/Home";
import Forum from "./ForumFiles/Forum";
import Sales from "./SalesFiles/Sales";
import BackgroundImage from './HomeFiles/Background';
import websiteLogo from "./Images/Logo.jpg";
import "./style.css";

function Logo(){
  return(
    <img src={websiteLogo} className="nav-logo"></img>
  )
}

function Title(){
  return(
    <h1 className="title">ORC4NIC JUICE</h1>
  )
}

function MainNavBar(){
  return (
      <ul className="navitems">
          <Link className="navLink" to="/">Home</Link>
          <Link className="navLink" to="/forum.html">Forum</Link>
          <Link className="navLink" to="/sales.html">Sales</Link>
      </ul>
  );
}

function MainContent(){
  return(
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forum.html" element={<Forum />} />
          <Route path="/sales.html" element={<Sales />} />
        </Routes>
    </div>
  )
  
}

function Header(){
  return(
    <div>
      <nav className="nav">
        <Logo/>
        <MainNavBar/>
      </nav>
      <BackgroundImage/>
      <Title/>
      
      
    </div>
  )
}

export default function App() {
  return(
    <BrowserRouter>
      <Header/>
      <MainContent/>
    </BrowserRouter>
  )
  
}