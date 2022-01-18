import React from 'react'
import { useStopwatch } from '../hooks/useStopwatch';

export const Test = () => {

    const {
        time,
        startTime,
        stopTime
      } = useStopwatch();

    return (
        <div style={{textAlign: 'center'}}>
            <h1>react-timer-hook</h1>
            <p>Stopwatch Demo</p>
            <div style={{fontSize: '100px'}}>
                <span>{time}</span>
            </div>
            <button onClick={startTime}>Start</button>
            <button onClick={stopTime}>Pause</button>
        </div>
    )
}
