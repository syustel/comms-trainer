import React from 'react';
import { NavLink } from "react-router-dom";

import '../styles/sidebar.css';

export const Sidebar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 bg-light vh-100" style={{width: '100px'}}>

            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li className="nav-item">
                    <NavLink exact to="/" className="nav-link py-3 border-bottom">
                        <i className="fa fa-home"></i>
                        <small>Home</small>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/train" className="nav-link py-3 border-bottom">
                        <i className="fa fa-brain"></i>
                        <small>Train</small>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/config" className="nav-link py-3 border-bottom">
                        <i className="fa fa-cog"></i>
                        <small>Config</small>
                    </NavLink>
                </li>

                {/*<li>
                    <NavLink to="/test" className="nav-link py-3 border-bottom">
                        <i className="fa fa-pencil"></i>
                        <small>Tests</small>
                    </NavLink>
                </li>*/}
            </ul>

        </div>
    )
}
