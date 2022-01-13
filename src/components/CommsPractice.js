import React, { useState } from 'react';
import useKeypress from 'react-use-keypress';
import { translatePair } from '../helpers/piecesLogic';

export const CommsPractice = ({practiceTargets}) => {

    const comms = JSON.parse(localStorage.getItem("comms"))||{};

    const [commPos, setCommPos] = useState(0)
    
    const nextComm = () => {
        setCommPos(Math.min(commPos+1, practiceTargets.length));
    }

    const previousComm = () => {
        setCommPos(Math.max(commPos-1, 0));
    }
    
    
    const retry = () => {
        practiceTargets.sort(() => (Math.random() - 0.5));
        setCommPos(0);
    }
    
    useKeypress([" ", "ArrowRight"], nextComm);
    useKeypress("ArrowLeft", previousComm);

    //const [debug, setDebug] = useState('debug')

    return (
        <div onTouchStart={nextComm}>
            {commPos < practiceTargets.length?
                <>
                <h2 className='position-relative'>
                    {translatePair(practiceTargets[commPos])}
                    <button
                        className='position-absolute top-0 btn btn-dark btn-sm mx-1'
                        style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '15px',
                            fontSize: '11px',
                            padding: '0px 6px',
                            textAlign: 'center',
                        }}
                        title={comms[practiceTargets[commPos].join("-")]||'no comm'}
                    >
                        ?
                    </button>
                </h2>
                <h5>
                    {`${commPos+1}/${practiceTargets.length}`}
                </h5>
                </>
            :
                <>
                <h2>Done!</h2>
                <button className='btn btn-primary' onClick={retry} autoFocus>
                    Retry?
                </button>
                </>
            }
        </div>
    )
}
