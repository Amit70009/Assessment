import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import MainPage from './MainPage'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import Typography from '@mui/material/Typography';
import '../App.css'

const Result = () => {
    return (
        <p>Your email has been sent successfully</p>
    )
}

function ContactUS() {
    const [result, setResult] = useState(false)
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_v9a9f2g', 'template_p3dfp2l', e.target, 'umzHPJvCAw-wHx_qI')
        /* .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        }); */
        e.target.reset();
        setResult(true)
    }
    setTimeout(() => {
        setResult(false)
    }, 5000);

    return (
        <>
            <MainPage />
            <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner carousel">
    <div class="carousel-item active">
      <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" class="d-block w-100 " alt="..." />
    </div>
    <div class="carousel-item">
      <img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" class="d-block w-100" alt="..." />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        </>
    )
}
export default ContactUS