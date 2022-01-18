import React, { useState } from 'react';
import useKeypress from 'react-use-keypress';

import { useStopwatch } from '../hooks/useStopwatch';
import { translatePair } from '../helpers/piecesLogic';

export const CommsPractice = ({practiceTargets}) => {

    const comms = JSON.parse(localStorage.getItem("comms"))||{};

    const [commPos, setCommPos] = useState(0);
    const [times, setTimes] = useState({});
    

    const {
        time,
        startTime,
        stopTime,
        restartTime,
        isRunning
      } = useStopwatch();
    
    const nextComm = () => {
        setCommPos(Math.min(commPos+1, practiceTargets.length));
        restartTime();
        startTime();
    }

    const previousComm = () => {
        setCommPos(Math.max(commPos-1, 0));
    }
    
    const handleTimer = () => {
        if (isRunning) {
            stopTime();
            let tempTimes = {...times};
            tempTimes[translatePair(practiceTargets[commPos])] = time
            setTimes(tempTimes);
        } else {
            nextComm();
        }
    }
    
    
    const retry = () => {
        practiceTargets.sort(() => (Math.random() - 0.5));
        setCommPos(0);
    }
    
    useKeypress(" ", handleTimer);
    useKeypress("ArrowRight", nextComm);
    useKeypress("ArrowLeft", previousComm);

    //const [debug, setDebug] = useState('debug')

    return (
        <div onTouchStart={nextComm}>
            {commPos < practiceTargets.length?
                <>
                <h1 className='position-relative'>
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
                </h1>

                <h3>{time}</h3>

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
                <div style={{columnCount: 5}}>
                    {practiceTargets.sort((pair1, pair2) => (times[translatePair(pair2)]-times[translatePair(pair1)])).map(pair => (
                        <div key={translatePair(pair)}>
                            {`${translatePair(pair)} ${times[translatePair(pair)]}`}
                        </div>
                    ))}
                </div>
                </>
            }
        </div>
    )
}
