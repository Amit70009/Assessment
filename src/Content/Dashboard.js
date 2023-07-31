import React, { useState } from "react";
import Sidebarr from './Sidebar/Sidebar'
import HomePage from "./Home/Home";
import ResultPage from "./Result/Result"
import AnalyticsPage from "./Analytics/Analytics"
import SettingPage from "./Setting/Setting"
import { Link } from 'react-router-dom';
import AssessmentPage from "./Assessment/Assessment"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import AssessSetting from "./Assessment/AssessSetting";
import ViewQuestion from "./Assessment/ViewQuestion";
import EmailPage from "./Email/Email"
import EmailSetting from "./Email/EmailSetting"




export default function DashBoard() {

    return(
        <>
       <div className="GlassAppMain">
        <div className="AppGlass">
<Sidebarr/>

<div >
<Routes>
<Route  path='/home' element={<HomePage />}></Route>
<Route  path='/assessment' element={<AssessmentPage />}></Route>
<Route  path='/result' element={<ResultPage />}></Route>
<Route  path='/analytic' element={<AnalyticsPage />}></Route>
<Route  path='/email' element={<EmailPage />}></Route>
<Route  path='/setting' element={<SettingPage />}></Route>
<Route  path='/assessment/assessmentsetting' element={<AssessSetting />}></Route>
<Route  path='/setting/viewquestion' element={<ViewQuestion />}></Route>
<Route  path='/email/emailsetting' element={<EmailSetting />}></Route>
</Routes>
</div>
<div>
    Hello
</div>

        </div>
       </div>
        </>
    )
}