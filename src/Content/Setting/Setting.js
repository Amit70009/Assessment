import React from "react"
import { useState, useEffect } from "react";
import "./Setting.css"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import DashBoard from "../Dashboard";
import { Children } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
   
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));


export default function Setting() {
    const [profile, setprofile] = React.useState([]);
    const [email, setEmail] = React.useState(null);
    const Navigation = useNavigate()
    const [update, setUpdate] = React.useState(true);


    const ProfileCallOnClick = async () => {
    
        const x = (JSON.parse(localStorage.getItem("user-details")))
        const ProfileCall = await axios.get("https://expensive-seal-kerchief.cyclic.app/api/users/profile", {
            params: { email: x.email },
        }, {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        },);

        setprofile(await ProfileCall.data.data.matchUser);
    //  console.log(ProfileCall.data.data.matchUser.first_name);
console.log(profile); 
}
    
    useEffect(() => {
        ProfileCallOnClick(profile);
      }, []);

    const UpdateProfile = async() => {
      const x = (JSON.parse(localStorage.getItem("user-details")))
      const UpdateCall = await axios.post("https://expensive-seal-kerchief.cyclic.app/api/users/update", {
            params: { email: x.email },
        }, {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        },);
        setprofile(profile.data.data.matchUser)
    }
    return (
        <>
        
 <div className="Setting" onLoad={ProfileCallOnClick}>
    <h3>Setting</h3>
    <button onClick={() => {localStorage.clear()
      Navigation('/login')}}>Logout</button>
        <div className="MyProfile">
            <div className="Details">
<div>
<button>Edit</button>
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          value= {profile.first_name}
          InputProps={{
            readOnly: true,
          }}
        />
          </div>
        </div>
        </div>
 </div>

</>
    )
}