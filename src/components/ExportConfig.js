import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ExportConfig = () => {

    const letterScheme = localStorage.getItem("letterScheme");
    const comms = localStorage.getItem("comms");
    
    const exportText = {letterScheme, comms};

    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

    const copy = () => {
        const copyText = document.getElementById("export");

        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
      
        try {
            navigator.clipboard.writeText(copyText.value);
            setShowSuccess(true);
        } catch {
            setShowFailure(true);
        }
    };

    const download = () => {
        let element = document.createElement('a');
        const downloadText = document.getElementById("export").value;
        element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(downloadText));
        element.setAttribute('download', 'comms-trainer-config.txt');
        document.body.appendChild(element);
        element.click();
    };
    
    

    return (
        <>
            <h1 className='m-4' style={{display: 'inline-block'}}>
                Export config
            </h1>
            <Link to="/config">
                <button className="btn btn-primary" style={{float: 'right'}}>
                    <i className="fa fa-arrow-left"></i> Back
                </button>
            </Link>

            <div className='m-3'>
                <textarea
                    className="form-control"
                    id="export"
                    readOnly
                    value={JSON.stringify(exportText)}
                    style={{height: "20em"}}
                ></textarea>
            </div>

            <button className='btn btn-primary' title='Copy to clipboard' onClick={copy}>Copy</button>
            <span className='mx-2'>or</span>
            <button className='btn btn-primary' title='Download export file' onClick={download}>Download</button>

            {showSuccess && 
                <div className="alert alert-success m-2" role="alert">
                    Text copied.
                </div>
            }

            {showFailure && 
                <div className="alert alert-danger m-2" role="alert">
                    Could not copy.
                </div>
            }
        </>
    )
}