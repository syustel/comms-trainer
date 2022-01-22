import React from 'react'
import { Link } from "react-router-dom";

export const Config = () => {
    return (
        <>
            <h1 className='m-4'>
                Config
            </h1>
            <Link to="/config/letter_scheme">
                <button className="btn btn-primary btn-lg m-2">
                    <i className="fa fa-cog"></i> Letter scheme
                </button>
            </Link>
            <Link to="/config/edge_comms">
                <button className="btn btn-primary btn-lg m-2">
                    <i className="fa fa-cog"></i> Edge comms
                </button>
            </Link>
            <Link to="/config/corner_comms">
                <button type="button" className="btn btn-primary btn-lg m-2">
                    <i className="fa fa-cog"></i> Corner comms
                </button>
            </Link>
            <Link to="/config/export_config">
                <button type="button" className="btn btn-primary btn-lg m-2">
                    <i className="fa fa-download"></i> Export config
                </button>
            </Link>
            <Link to="/config/import_config">
                <button type="button" className="btn btn-primary btn-lg m-2">
                    <i className="fa fa-upload"></i> Import config
                </button>
            </Link>
        </>
    )
}
