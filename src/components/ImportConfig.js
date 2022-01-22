import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ImportConfig = () => {

    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

    const importConfig = () => {
        try {
            const config = document.getElementById("import").value;
            const {letterScheme, comms} = JSON.parse(config);
            
            localStorage.setItem('letterScheme', letterScheme);
            localStorage.setItem('comms', comms);

            setShowFailure(false);
            setShowSuccess(true);
        } catch {
            setShowSuccess(false);
            setShowFailure(true);
        }
    }

    const upload = () => {
        try {
            const configFile = document.getElementById("configFile").files[0];
            console.log(configFile);
    
            const fr = new FileReader();
            fr.onload = () => {
                const {letterScheme, comms} = JSON.parse(fr.result);
            
                localStorage.setItem('letterScheme', letterScheme);
                localStorage.setItem('comms', comms);
    
                setShowFailure(false);
                setShowSuccess(true);
            };
            fr.readAsText(configFile);
        } catch {
            setShowSuccess(false);
            setShowFailure(true);
        }
    }    
    
    return (
        <>
            <h1 className='m-4' style={{display: 'inline-block'}}>
                Import config
            </h1>
            <Link to="/config">
                <button className="btn btn-primary" style={{float: 'right'}}>
                    <i className="fa fa-arrow-left"></i> Back
                </button>
            </Link>

            <div className='m-3'>
                <textarea
                    className="form-control"
                    id="import"
                    style={{height: "17em"}}
                ></textarea>
            </div>
            <button className='btn btn-primary' onClick={importConfig}>Import</button>
            
            <p>or</p>

            <div className='m-3'>
                <input type="file" id='configFile' className='form-control' />
            </div>
            <button className='btn btn-primary' onClick={upload}>Upload</button>

            {showSuccess && 
                <div className="alert alert-success m-2" role="alert">
                    Imported.
                </div>
            }

            {showFailure && 
                <div className="alert alert-danger m-2" role="alert">
                    Could not import.
                </div>
            }
        </>
    )
}
