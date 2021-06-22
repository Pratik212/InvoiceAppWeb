import React, { useState } from 'react';
import {Link, NavLink} from 'react-router-dom';
import { SidebarMenu } from './SidebarMenu';
import './Sidebar.css'
import { IconContext } from 'react-icons';
import logo from "../../../img/invoice1.png";
import * as FaIcons from "react-icons/fa";

function Sidebar(props) {
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => {
        props.sidebarActiveStatus(!sidebar)
        setSidebar(!sidebar);
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#ffffff', size: '25px' }}>
                <nav className="navbar navbar-light" style={{backgroundColor: '#2E4053', zIndex: 99999999}}>
                    <Link className="navbar-brand" to="#">
                        <img
                            src={logo}
                            height="50"
                            className="d-inline-block align-top"
                            alt=""
                            loading="lazy"
                            style={{marginLeft:'20px' ,width:'20%'}}
                        />
                    </Link>
                    <form className="form-inline">
                        <Link to="#" className="menu-bars">
                            <FaIcons.FaBars onClick={showSidebar} />
                        </Link>
                    </form>
                </nav>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <ul className="nav-menu-items">
                        {SidebarMenu.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className={item.cName}
                                >
                                    <NavLink activeClassName="active-tab" to={item.path}>
                                        <span style={{textAlign:'center',display:'flex' , justifyContent:'center'}}>{item.title}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Sidebar;
