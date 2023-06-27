import React from "react";
import { useEffect } from "react";
import Login from '../LoginPage/Login'
import { useNavigate } from "react-router-dom";
import '../App.css'
export default function MainPage(){
    var HomeNavigationBar = useNavigate();

    
    return(
        <>
        <nav class="navbar navbar-expand-lg bg-light">
          <div class="container-fluid">
            <img className="img" onClick={() => HomeNavigationBar('/') } src="https://starlitenutrition.com/starlite/images/logo.svg" />
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class=" nav collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item nav">
                  <a class="nav-link active" aria-current="page" href="#home" onClick={() => HomeNavigationBar('/') }>Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={() => HomeNavigationBar('/aboutus') }>About Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Centers</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Courses
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" onClick={() => HomeNavigationBar('/home/courses/DCA') }>DCA</a></li>
                    <li><a class="dropdown-item" href="#">PGDCA</a></li>
                    <li><a class="dropdown-item" href="#">CCA</a></li>
                    <li><a class="dropdown-item" href="#">Tally</a></li>
                    <li><a class="dropdown-item" href="#">CPCT</a></li>
                    <li><a class="dropdown-item" href="#">Typing</a></li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link pointer" onClick={() => HomeNavigationBar('/contactUs') } href='#'>Contact us</a>
                </li>
              </ul>
              <form class="d-flex" role="search">
              <button type="button" class="btn btn-success loginbtn" onClick={() => HomeNavigationBar('/login')} >Login</button>
              <button type="button" class="btn btn-info" onClick={() => HomeNavigationBar('/register')}>Register</button>
              </form>
            </div>
          </div>
        </nav>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <div className="card-body"></div>
            </div>
            <div className="col">
            
            </div>
          </div>
          </div>
        </>
    );
}