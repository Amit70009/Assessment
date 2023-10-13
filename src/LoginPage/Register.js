import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../App.css'


const theme = createTheme();

export default function SignInSide() {
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [companyname, setCompanyName] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [gender, setGender] = useState(null);
  const [sbMessage, setsbMessage] = useState("");
  const navig = useNavigate();

  const registerFunction = async() => {
    if(email && password){
      const registercall = await axios.post("https://expensive-seal-kerchief.cyclic.app/api/users/register", {
       first_name,
       last_name,
       email,
       password,
       gender,
       companyname,
       mobile
      }, {headers: {
        "Content-Type": "application/json"
      }})
      if(registercall && registercall.data && registercall.data.status !== 200){
        alert(registercall.data.message)
      }
      else if (registercall && registercall.data && registercall.data.status == 200){
        alert(registercall.data.message)
        navig("/login")
      }
     
  }
  else{
    alert("Please enter the required details")
  }
    
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
  };
  const handleChange = (event) => {
    setGender(event.target.value);
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={2} square>
          <Box
            sx={{
              my: 3,
              mx: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                onChange={(event) => setFirstName(event.target.value)}
                id="full_name"
                label="First name"
                name="last_name"
                autoComplete="text"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(event) => setLastName(event.target.value)}
                id="full_name"
                label="Last name"
                name="last_name"
                autoComplete="text"
                autoFocus
              />
              <TextField
              
                margin="normal"
                required
                fullWidth
                onChange={(event) => setEmail(event.target.value)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
              
                margin="normal"
                required
                fullWidth
                onChange={(event) => setGender(event.target.value)}
                id="gender"
                label="Gender"
                name="gender"
                autoComplete="gender"
                autoFocus
              />
             
              <TextField
              margin="normal"
              required
              fullWidth
              onChange={(event) => setMobile(event.target.value)}
              id="phone_no."
              label="Phone number"
              name="phone_number"
              autoComplete="number"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(event) => setCompanyName(event.target.value)}
              id="phone_no."
              label="Company Name"
              name="Company Name"
              autoComplete="text"
              autoFocus
            />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(event) => setPassword(event.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
             
              
              <Button
                type="submit"
                fullWidth
                onClick={registerFunction}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                
              >
              Register
              </Button>
              <Grid container>
                <Grid item xs>
                <Link href="/" variant="body2">
                    {"Go Back to HomePage"}
                  </Link>
                </Grid>
                <Grid item>
                
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
           
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
