import React, { useState } from 'react';

import { performCycle, validateComm } from '../helpers/cubeLogic';

export const Test = () => {


    const [moves, setMoves] = useState("");
    const [validComm, setValidComm] = useState(false);


    const handleChange = (e) => {
        setMoves(e.target.value);
        setValidComm(validateComm(['UFR', 'RUB', 'BUL'], e.target.value));
    }

    console.log(performCycle(['UF', 'UB', 'UL']));
    //console.log(validateComm(['UFR', 'RUB', 'BUL'], "[U R : [U2, R D R']]"));

    return (
        <>
            <h1>cube.js test</h1>
            <input type="text" onChange={handleChange} value={moves}></input>
            <p>{validComm?'valid comm :)':'invalid comm :('}</p>
        </>
    )
}
