import React from 'react';
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <>
            <h1 className='m-4'>
                Home
            </h1>
            <Link to="/train">
                <button className="btn btn-primary btn-lg m-2">
                    <i className="fa fa-brain"></i> Train
                </button>
            </Link>
            <Link to="/config">
                <button type="button" className="btn btn-primary btn-lg m-2">
                    <i className="fa fa-cog"></i> Config
                </button>
            </Link>
        </>
    )
}
