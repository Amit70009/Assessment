import * as React from 'react';
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
import axios from 'axios';
import { useState, useEffect } from 'react';
import AppBar from './AppBar'
import { useNavigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import App from '../App';

function Copyright(props) {
  
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
 const [sbOpen, setsbOpen] = React.useState(false)
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [sbMessage, setsbMessage] = useState("");
  const [sbSeverity, setsbSeverity] = useState("");
  const [route, setRoute] = useState({

  })
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const handleClick = () => {
    setsbOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsbOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const Navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("user-details")){
        Navigate('/home')
    }
  })
  const loginFunction = async() => {
    if(email && password){
      const loginCall = await axios.post("https://expensive-seal-kerchief.cyclic.app/api/users/login", {
       email,
       password
      }, {headers: {
        "Content-Type": "application/json"
      }});
      if(loginCall && loginCall.data && loginCall.data.status !== 200){
        setsbMessage(loginCall.data.message);
    setsbSeverity("error")
    handleClick();
      }
      else if (loginCall && loginCall.data && loginCall.data.status == 200){
        return(
        
          localStorage.setItem("user-details", JSON.stringify({
            access_token: loginCall.data.data.acc_token,
            first_name: loginCall.data.data.first_name,
            last_name: loginCall.data.data.last_name,
            role: loginCall.data.data.role,
            email: loginCall.data.data.email,
            userID: loginCall.data.data.userId
          })
          
         ),
          Navigate('/home')
        )
    
      }
     
  }
  else{
    setsbMessage("Please enter Email and Password")
    setsbSeverity("warning")
    handleClick();
  }
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
 
  }

  return (
    <>
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
              onClick={loginFunction}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                
              </Grid>
              <Grid>
                <Link href="/" variant="body2">
                    {"Go Back to HomePage"}
                  </Link>
                  </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    <Snackbar anchorOrigin={{ vertical, horizontal }} open={sbOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={sbSeverity} sx={{ width: '100%' }}>
          {sbMessage}
        </Alert>
      </Snackbar>
     
      </>
  );
}