import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useKeypress from 'react-use-keypress';

import { useStopwatch } from '../hooks/useStopwatch';
import { translatePair } from '../helpers/piecesLogic';

export const CommsPractice = ({practiceTargets, timerEnabled, controlType}) => {

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
        if (timerEnabled && commPos+1 < practiceTargets.length) {
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
        restartTime();
        startTime();
    }

    const sum = (times) => {
        return Object.values(times).reduce((sum, num) => (sum+num), 0);
    }

    const calcMean = useCallback((times) => {
        return Math.round(sum(times)/Object.values(times).length);
    }, []);
    const mean = useMemo(() => calcMean(times), [calcMean, times]);
    
    const calcDev = useCallback((times) => {
        return Math.round(Math.sqrt(Object.values(times).map(t => ((t-mean)**2)).reduce((sum, num) => (sum+num), 0)/Object.values(times).length));
    }, [mean]);
    const dev = useMemo(() => calcDev(times), [calcDev, times]);
    
    const evaluateTime = (time) => {
        if (time > mean + dev) {
            return 'red';
        }
        if (time < mean - dev) {
            return 'green';
        }
        return 'blue';
    };
    
    
    useKeypress(" ", () => {controlType==="keyboard" && handleTimer()});
    useKeypress("ArrowRight", () => {controlType==="keyboard" && nextComm()});
    useKeypress("ArrowLeft", () => {controlType==="keyboard" && previousComm()});

    //const [debug, setDebug] = useState('debug')

    return (<>
        <div onTouchStart={() => {controlType==="touch" && nextComm()}}>
            {commPos < practiceTargets.length?
                <>
                <h1 className='position-relative'>
                    {translatePair(practiceTargets[commPos])}
                    <button
                        className='reminder position-absolute top-0 btn btn-dark btn-sm mx-1'
                        title={comms[practiceTargets[commPos].join("-")]||'no comm'}
                        data-bs-toggle="modal"
                        data-bs-target="#reminderModal"
                    >
                        ?
                    </button>
                </h1>

                {timerEnabled && <h3>{time}</h3>}

                <h5>
                    {`${commPos+1}/${practiceTargets.length}`}
                </h5>

                {controlType==="buttons" && <>
                    <button className='btn btn-primary btn-lg' onClick={previousComm}>Prev comm</button>
                    {timerEnabled && <button className='btn btn-primary btn-lg' onClick={handleTimer}>{isRunning?'Stop':'Start'} timer</button>}
                    <button className='btn btn-primary btn-lg' onClick={nextComm}>Next comm</button>
                </>}
                <div className="modal fade" id="reminderModal" tabIndex="-1" aria-labelledby="reminderModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{translatePair(practiceTargets[commPos])}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {comms[practiceTargets[commPos].join("-")]||'no comm'}
                            </div>
                        </div>
                    </div>
                </div>
                </>
            :
                <>
                <h2>Done!</h2>
                <button className='btn btn-primary' onClick={retry} autoFocus>
                    Retry?
                </button>

                {timerEnabled && <>
                    <h5>Total: {sum(times)} Mean: {calcMean(times)} Deviation: {calcDev(times)}</h5>

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

    </>)
}
