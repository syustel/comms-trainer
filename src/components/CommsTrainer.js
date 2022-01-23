import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../styles/general.css';
import { getTargets, generatePairs } from '../helpers/piecesLogic';
import { CommsPractice } from './CommsPractice';

export const CommsTrainer = ({pieceType}) => {

    const letterScheme = JSON.parse(localStorage.getItem("letterScheme"));
    
    const [practiceTargets, setPracticeTargets] = useState([]);
    //const [timerEnabled, settimerEnabled] = useState(false);

    const targets = getTargets(pieceType);
    
    if (!targets) {
        return (
            <>
                <h1 className='m-4'>
                    {pieceType[0].toUpperCase() + pieceType.substring(1)} comms
                </h1>
                <div className="alert alert-warning alert-dismissible m-2" role="alert">
                    Looks like you don't have a letter scheme, do you want to <Link to="/config/letter_scheme">make one</Link>?
                </div>
            </>
        );
    }

    const back = () => {
        setPracticeTargets([]);
    }

    const toggleAll = () => {
        const allCheckbox = document.getElementById("All");
        targets.forEach(target => document.getElementById(target).checked = allCheckbox.checked);
    }

    const go = () => {
        setPracticeTargets(generatePairs(targets));
    }

    const controlType = () => {
        let controlSelected = ''
        document.getElementsByName("controls").forEach( radioButton => {
            if (radioButton.checked) {
                controlSelected = radioButton.value;
            }
        });
        return controlSelected;
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
                <CommsPractice practiceTargets={practiceTargets} timerEnabled={document.getElementById('timer').checked} controlType={controlType()}/>
                </>
            :
                <>
                <Link to="/train">
                    <button className="btn btn-primary" style={{float: 'right'}}>
                        <i className="fa fa-arrow-left"></i> Back
                    </button>
                </Link>
                
                <div style={{columnCount: 4, textAlign: 'left', marginLeft: 40}}>
                    <div>
                        <input
                            type = "checkbox"
                            id = "starting"
                            value = "starting"
                        />
                        <label htmlFor='starting'>Starting with</label><br/>
                    </div>
                    <div>
                        <input
                            type = "checkbox"
                            id = "ending"
                            value = "ending"
                        />
                        <label htmlFor='ending'>Ending with :</label><br/>
                    </div>
                </div>
                <br/>

                <div style={{columnCount: 4, textAlign: 'left', marginLeft: 40}}>
                    <div key = "All">
                        <input
                            type = "checkbox"
                            id = "All"
                            value = "All"
                            onClick = {toggleAll}
                        />
                        <label htmlFor='All'>All</label><br/>
                    </div>
                    {targets.map(target => (
                        <div key = {target} >
                            <input
                                type = "checkbox"
                                id = {target}
                                value = {target}
                            />
                            <label htmlFor={target}>{letterScheme[target]}</label><br/>
                        </div>
                    ))}
                </div>

                <br />
                <div style={{textAlign: 'left', marginLeft: 40}}>
                    <input
                        type='checkbox'
                        id='timer'
                    />
                    <label htmlFor='timer'>Timer</label>
                </div>

                <br />
                <div style={{columnCount: 4, textAlign: 'left', marginLeft: 40}}>
                    <p>Controls:</p>

                    <div>
                        <input type="radio" id='keyboard' name='controls' value="keyboard" defaultChecked/>
                        <label htmlFor='keyboard'>Keyboard</label>
                    </div>
                    
                    <div>
                        <input type="radio" id="touch" name='controls' value="touch"/>
                        <label htmlFor='touch'>Touch</label>
                    </div>
                    
                    <div>
                        <input type="radio" id='buttons' name='controls' value="buttons"/>
                        <label htmlFor='buttons'>Buttons</label>
                    </div>
                </div>
                
                <button className="btn btn-primary btn-lg mt-3" onClick={go}>
                    Go
                </button>

                </>
            }
        </>
    )
}
