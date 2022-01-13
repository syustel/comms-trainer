import React from 'react'

export const Test = () => {
    return (
        <div style={{
            position: 'relative',
            width: '55px',
            height: '55px'
        }}>
            <input style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '55px',
                height: '55px'
            }} />
            <input type="radio" style={{
                position: 'absolute',
                top: 2,
                left: 2
            }} />
            
        </div>
    )
}
