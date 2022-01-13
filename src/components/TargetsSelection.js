import React from 'react';
import { generatePairs } from '../helpers/piecesLogic';

export const TargetsSelection = ({targets, setPracticeTargets}) => {

    const letterScheme = JSON.parse(localStorage.getItem("letterScheme"));

    const toggleAll = () => {
        const allCheckbox = document.getElementById("All");
        targets.forEach(target => document.getElementById(target).checked = allCheckbox.checked);
    }

    const go = () => {
        setPracticeTargets(generatePairs(targets));
    }

    return (
        <>
            <div style={{columnCount: 4, textAlign: 'left', marginLeft: 40}}>
                <div>
                    <input
                        type = "checkbox"
                        id = "starting"
                        value = "starting"
                    />
                    <label htmlFor='starting' style={{marginLeft: 2}}>Starting with</label><br/>
                </div>
                <div>
                    <input
                        type = "checkbox"
                        id = "ending"
                        value = "ending"
                    />
                    <label htmlFor='ending' style={{marginLeft: 2}}>Ending with :</label><br/>
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
                    <label htmlFor='All' style={{marginLeft: 2}}>All</label><br/>
                </div>
                {targets.map(target => (
                    <div key = {target} >
                        <input
                            type = "checkbox"
                            id = {target}
                            value = {target}
                        />
                        <label htmlFor={target} style={{marginLeft: 2}}>{letterScheme[target]}</label><br/>
                    </div>
                ))}
            </div>
            <br/>
            <button className="btn btn-primary btn-lg" onClick={go}>
                Go
            </button>
        </>
    )
}
