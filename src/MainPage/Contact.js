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
            <Grid container component="main" sx={{ height: '93vh' }} className="backg">
            <Grid item xs={2} sm={2} md={3} component={Paper} elevation={6} square> <p> </p></Grid>
            <Grid item xs={8} sm={8} md={6} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <ContactEmergencyIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Contact Us Form
                    </Typography>
                    <Box component="form" noValidate onSubmit={sendEmail} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Full Name"
                            name="from_name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
                            id="email"
                        />
                        <TextField
                        maxlength="10"
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="Phone Number"
                            type="number"
                           
                        />
                        <TextField
                        id='outlined-multiline-flexible'
                        minRows={5}
                            margin="normal"
                            required
                            multiline
                            fullWidth
                            name="message"
                            label="Description"
                            type="text"
                        />
                        <Button
                            type="submit"
                            value='send'
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                          Submit
                        </Button>

                    </Box>
                </Box>
            </Grid>
            <Grid item xs={2} sm={2} md={3} component={Paper} elevation={6} square></Grid>
            </Grid>
        </>
    )
}
export default ContactUS