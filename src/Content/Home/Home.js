import React, { useEffect } from "react";
import './Home.css'
import Card from "../card/Card";
import '../../App.css'
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    const x = JSON.parse(localStorage.getItem("user-details"));

    
    return (
<div className="MainPage">
    
    <div>
    <h4>Hey {x?.first_name} {x?.last_name}, Welcome Back</h4>
    </div>
</div>
    )
}