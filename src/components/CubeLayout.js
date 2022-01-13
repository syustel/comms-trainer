import React, { useEffect, useState } from 'react';

import { stickers } from '../helpers/stickers';
import '../styles/cubeLayout.css';

export const CubeLayout = () => {

    const letterScheme = JSON.parse(localStorage.getItem("letterScheme"));

    const [showSuccess, setShowSuccess] = useState(false);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        return () => {
            setIsMounted(false);
        }
    }, []);

    const save = () => {
        let errors = [];
        let letterScheme = {};

        // check for edge buffer
        let edgeBuffer = '';
        document.getElementsByName("edge-buffer").forEach( stickerRadio => {
            if (stickerRadio.checked) {
                edgeBuffer = stickerRadio.value;
                letterScheme['edgeBuffer'] = edgeBuffer;
            }
        });
        if (!edgeBuffer) {errors.push('Must select edge buffer');}

        // check for corner buffer
        let cornerBuffer = '';
        document.getElementsByName("corner-buffer").forEach( stickerRadio => {
            if (stickerRadio.checked) {
                cornerBuffer = stickerRadio.value
                letterScheme['cornerBuffer'] = cornerBuffer;
            }
        });
        if (!cornerBuffer) {errors.push('Must select corner buffer');}

        // check all sticker letters
        let allAsigned = '';
        let asignedEdges = [];
        let asignedCorners = [];
        let repeatedEdgeError = '';
        let repeatedCornerError = '';
        let reapetedEdgeLetters = [];
        let reapetedCornerLetters = [];
        stickers.filter( sticker => sticker.length > 1).forEach( sticker => {
            const stickerField = document.getElementById(sticker);
            letterScheme[sticker] = stickerField.value;
            if (!stickerField.value) {
                allAsigned = 'Must asign all letters';
                stickerField.className = `form-control sticker-textfield error`
            } else {
                stickerField.className = `form-control sticker-textfield`
                if (sticker.length === 2) {
                    if (asignedEdges.includes(stickerField.value)) {
                        reapetedEdgeLetters.push(stickerField.value);
                        repeatedEdgeError = 'There are edges with the same letter'
                    }
                    asignedEdges.push(stickerField.value);
                } else if (sticker.length === 3) {
                    if (asignedCorners.includes(stickerField.value)) {
                        reapetedCornerLetters.push(stickerField.value);
                        repeatedCornerError = 'There are corners with the same letter'
                    }
                    asignedCorners.push(stickerField.value);
                }
            }
        });
        stickers.forEach( sticker => {
            const stickerField = document.getElementById(sticker);
            if (sticker.length === 2) {
                if (reapetedEdgeLetters.includes(stickerField.value)) {
                    stickerField.className = `form-control sticker-textfield error`
                }
            } else if (sticker.length === 3) {
                if (reapetedCornerLetters.includes(stickerField.value)) {
                    stickerField.className = `form-control sticker-textfield error`
                }
            }
        });
        if (allAsigned) {errors.push(allAsigned);}
        if (repeatedEdgeError) {errors.push(repeatedEdgeError);}
        if (repeatedCornerError) {errors.push(repeatedCornerError);}

        // check errors
        if (errors.length) {
            alert(errors.join("\n"));
        } else {
            localStorage.setItem('letterScheme',JSON.stringify(letterScheme));
            setShowSuccess(true);
            setTimeout(() => {
                if (isMounted) {
                    setShowSuccess(false)
                }
            }, 3500);
        }
    }

    return (
        <>
            <div className="grid-container">
                {
                    stickers.map( sticker => (
                        <div className={`grid-item ${sticker}`} key={sticker}>
                            <input
                                type = "text"
                                className = 'form-control sticker-textfield'
                                disabled = {sticker.length === 1}
                                maxLength = "1"
                                key = {sticker}
                                id = {sticker}
                                placeholder = {sticker}
                                defaultValue = {letterScheme && letterScheme[sticker]}
                            />
                            {sticker.length === 1||
                                <input
                                    type = "radio"
                                    className = "sticker-buffer"
                                    name = {sticker.length === 2?'edge-buffer':'corner-buffer'}
                                    value = {sticker}
                                    defaultChecked = {letterScheme && (sticker === letterScheme.edgeBuffer || sticker === letterScheme.cornerBuffer)}
                                />
                            }
                        </div>
                    ) )
                }
            </div>

            <button type="button" className="btn btn-primary" onClick={save}>
                Save
            </button>

            {showSuccess && 
                <div className="alert alert-success m-2" role="alert">
                    Letter scheme saved.
                </div>
            }
        </>
    )
}
