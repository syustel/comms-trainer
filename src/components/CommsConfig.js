import React, { useState } from 'react'
import { Link } from "react-router-dom";

import { getTargets, notSamePiece, translatePair } from '../helpers/piecesLogic';

export const CommsConfig = ({pieceType}) => {

    const letterScheme = JSON.parse(localStorage.getItem("letterScheme"));
    let comms = JSON.parse(localStorage.getItem("comms"))||{};

    const targets = getTargets(pieceType);
    const [firstTarget, setFirstTarget] = useState('');
    
    const [showSuccess, setShowSuccess] = useState(false);

    if (!targets) {
        return (
            <>
                <h1 className='m-4' style={{display: 'inline-block'}}>
                    {pieceType[0].toUpperCase() + pieceType.substring(1)} comms
                </h1>
                <Link to="/config">
                    <button className="btn btn-primary back">
                        <i className="fa fa-arrow-left"></i> Back
                    </button>
                </Link>

                <div className="alert alert-warning alert-dismissible m-2" role="alert">
                    Looks like you don't have a letter scheme, do you want to <Link to="/config/letter_scheme">make one</Link>?
                </div>
            </>
        );
    }
    const secondTargets = targets.filter(secondTarget => (notSamePiece(firstTarget, secondTarget)));

    const back = () => {
        setFirstTarget("");
    }

    const save = () => {
        secondTargets.forEach(secondTarget => {
            const commField = document.getElementById(secondTarget);
            if (commField.value) {
                comms[`${firstTarget}-${secondTarget}`] = commField.value;
            }
        });
        
        localStorage.setItem('comms',JSON.stringify(comms));
        setShowSuccess(true);
    }

    const change = () => {
        setShowSuccess(false);
    }
    
    const targetStatus = (target) => {
        const secondTargets = targets.filter(secondTarget => (notSamePiece(target, secondTarget)));
        return secondTargets.reduce((completed, secondTarget) => (
            completed && !!comms[`${target}-${secondTarget}`]
        ))?'primary':'secondary';
    }    

    return (
        <>
            <h1 className='m-4' style={{display: 'inline-block'}}>
                {pieceType[0].toUpperCase() + pieceType.substring(1)} comms
            </h1>

            {firstTarget?<>
                <button className="btn btn-primary back" onClick={back}>
                    <i className="fa fa-arrow-left"></i> Back
                </button>
                <div style={{columnCount: 2}}>
                    {secondTargets.map(secondTarget => (
                        <div key={secondTarget} className='mx-3 row'>
                            <label htmlFor={secondTarget} className='col-1 col-form-label'>
                                {translatePair([firstTarget, secondTarget])}:
                            </label>
                            <div className='col-10'>
                                <input
                                    type = "text"
                                    className = 'form-control'
                                    key = {secondTarget}
                                    id = {secondTarget}
                                    onChange = {change}
                                    defaultValue = {comms[`${firstTarget}-${secondTarget}`]}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button className='btn btn-primary btn-lg mt-3' onClick={save}>
                    Save
                </button>
                {showSuccess && 
                    <div className="alert alert-success m-2" role="alert">
                        Comms saved.
                    </div>
                }
            </>:<>
                <Link to="/config">
                    <button className="btn btn-primary back">
                        <i className="fa fa-arrow-left"></i> Back
                    </button>
                </Link>
                <br/>
                {targets.map(target => (
                    <button key={target} className={`btn btn-${targetStatus(target)} btn-lg m-2`} onClick={() => {setFirstTarget(target);}}>
                        {letterScheme[target]}
                    </button>
                ))}
            </>}

        </>
    )
}
