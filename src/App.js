
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import AppBar from './LoginPage/AppBar'
import MainPage from './MainPage/MainPage';
import Login from './LoginPage/Login'
import Register from './LoginPage/Register'
import ForgotPass from './LoginPage/forgotPass'
import Home from './MainPage/Home'
import DashBoard from './Content/Dashboard';
import TestProfile from "./Profile/TestProfile copy"


function App() {
  return (
 
  <BrowserRouter>
    <Routes>
    <Route  path='/' element={<Home />}></Route>
    <Route  path='/login' element={<Login />}></Route>
      <Route  path='/register' element={<Register />}></Route>
      <Route  path='/forgotpassword' element={<ForgotPass />}></Route>
      <Route  path='/test' element={<TestProfile />}></Route>      
      <Route  path='/*' element={<DashBoard />}></Route>
          </Routes>
      </BrowserRouter>

       );
}
export default App;