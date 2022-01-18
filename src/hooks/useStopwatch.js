import { useEffect, useState } from 'react';

export const useStopwatch = () => {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let interval = null;
      
        if (isRunning) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => {
          clearInterval(interval);
        };
      }, [isRunning]);

    const startTime = () => {
        setIsRunning(true);
    }

    const stopTime = () => {
        setIsRunning(false);
    }

    const restartTime = () => {
        setTime(0);
    }
    
    
    return {
        time,
        isRunning,
        startTime,
        stopTime,
        restartTime
    };
    
}
