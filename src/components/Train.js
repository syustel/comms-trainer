import React from 'react';
import { Link } from "react-router-dom";

export const Train = () => {
    return (
        <>
            <h1 className='m-4'>
                What do you want yo train?
            </h1>
            <Link to="/train/edge_comms">
                <button className="btn btn-primary btn-lg m-2">
                    <i className="fa fa-brain"></i> Edge comms
                </button>
            </Link>
            <Link to="/train/corner_comms">
                <button type="button" className="btn btn-primary btn-lg m-2">
                    <i className="fa fa-brain"></i> Corner comms
                </button>
            </Link>
            <button type="button" className="btn btn-primary btn-lg m-2" disabled>
                <i className="fa fa-brain"></i> Coming soon...
            </button>
        </>
    )
}
