
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import HomePage from '../Home/Home'

import '../../App.css';

import DashBoard from '../Dashboard';
import AssessmentPage from '../Assessment/Assessment'
import SettingPage from '../Setting/Setting';
import ResultPage from "../Result/Result";
import AnalyticsPage from "../Analytics/Analytics"





function Test() {
  return (
 
  
  <DashBoard>
    <Routes>

    <Route exact path='/home' element={<HomePage />}></Route>

<Route exact path='/result' element={<ResultPage />}></Route>
<Route exact path='/analytic' element={<AnalyticsPage />}></Route>
<Route exact path='/setting' element={<SettingPage />}></Route>
      </Routes>
      </DashBoard>


       );
}

export default Test;
