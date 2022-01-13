import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { getTargets } from '../helpers/piecesLogic';
import { CommsPractice } from './CommsPractice';
import { TargetsSelection } from './TargetsSelection';

export const CommsTrainer = ({pieceType}) => {
    
    const [practiceTargets, setPracticeTargets] = useState([])

    const targets = getTargets(pieceType);
    
    if (!targets) {
        return (
            <>
                <h1 className='m-4'>
                    {pieceType[0].toUpperCase() + pieceType.substring(1)} comms
                </h1>
                <div className="alert alert-warning alert-dismissible m-2" role="alert">
                    Looks like you don't have a letter scheme, do you want to <Link to="/config">make one</Link>?
                </div>
            </>
        );
    }

    const back = () => {
        setPracticeTargets([]);
    }

    return (
        <>
            
            <h1 className='m-4' style={{display: 'inline-block'}}>
                {pieceType[0].toUpperCase() + pieceType.substring(1)} comms
            </h1>

            {practiceTargets.length?
                <>
                <button className="btn btn-primary" style={{float: 'right'}} onClick={back}>
                    <i className="fa fa-arrow-left"></i> Back
                </button>
                <CommsPractice practiceTargets={practiceTargets}/>
                </>
            :
                <>
                <Link to="/train">
                    <button className="btn btn-primary" style={{float: 'right'}}>
                        <i className="fa fa-arrow-left"></i> Back
                    </button>
                </Link>
                <TargetsSelection targets={targets} setPracticeTargets={setPracticeTargets}/>
                </>
            }
        </>
    )
}
