import React, { useEffect, useState } from 'react';
import useKeypress from 'react-use-keypress';

import { useStopwatch } from '../hooks/useStopwatch';
import { translatePair } from '../helpers/piecesLogic';

export const CommsPractice = ({practiceTargets, timerEnabled}) => {

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

      useEffect(() => {
        if (!timerEnabled) {
            stopTime();
        }
      }, [timerEnabled, stopTime]);
      
    
    const nextComm = () => {
        setCommPos(Math.min(commPos+1, practiceTargets.length));
        if (timerEnabled) {
            restartTime();
            startTime();
        }
    }

    const previousComm = () => {
        setCommPos(Math.max(commPos-1, 0));
    }
    
    const handleTimer = () => {
        if (isRunning && timerEnabled) {
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

    const sum = (times) => {
        return Object.values(times).reduce((sum, num) => (sum+num));
    }

    const mean = (times) => {
        return Math.round(sum(times)/Object.values(times).length);
    }
    
    const dev = (times) => {
        return Math.round(Math.sqrt(Object.values(times).map(t => ((t-mean(times))**2)).reduce((sum, num) => (sum+num))/Object.values(times).length));
    };
    
    const evaluateTime = (time) => {
        if (time > mean(times) + dev(times)) {
            return 'red';
        }
        if (time < mean(times) - dev(times)) {
            return 'green';
        }
        return 'blue';
    };
    
    
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

                {timerEnabled && <h3>{time}</h3>}

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

                {timerEnabled && <>
                    <h5>Total: {sum(times)} Mean: {mean(times)} Deviation: {dev(times)}</h5>

                    <div style={{columnCount: 5}}>
                        {practiceTargets.sort((pair1, pair2) => (times[translatePair(pair2)]-times[translatePair(pair1)])).map(pair => (
                            <div key={translatePair(pair)} style={{color: evaluateTime(times[translatePair(pair)])}}>
                                {`${translatePair(pair)} ${times[translatePair(pair)]}`}
                            </div>
                        ))}
                    </div>
                </>}
                </>
            }
        </div>
    )
}
