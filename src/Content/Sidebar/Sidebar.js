import React from "react";
import { Link } from 'react-router-dom';
import "../Sidebar/Sidebar.css"
import { UilEstate } from "@iconscout/react-unicons"
import { sideData } from "../Data/SidebarData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import HomePage from "../Home/Home";
import AppBar from "../../LoginPage/AppBar"
import Assessment from "../Assessment/Assessment";
export default function SidebarMenu( {children}) {
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();

    return (
        <div>
            <div className="Sidebar">
              
                <div className="Logo">
                    <img src="https://img.freepik.com/free-icon/verified-database-symbol-interface_318-46653.jpg?w=2000" alt="" />
                    <span>
                        Asse<span>ss</span>ment
                    </span>
                </div>
                <div className="menu">
                {sideData.map((item, index) => {
                        return (
                            <div className={selected === index ? "menuitem active" : "menuitem"}
                                key={index}
                                onClick={() => setSelected(index)}>
                                <div onClick={() => navigate(item.Navigation)}>
                                    <item.icon />
                                    <span>
                                        {item.Heading}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                    }
<main> {children} </main>

                </div>
            </div>
        </div>
    )
}