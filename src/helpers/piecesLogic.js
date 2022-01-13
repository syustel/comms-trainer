import { stickers } from '../helpers/stickers';

export const notSamePiece = (sticker1, sticker2) => {
    return sticker1.split('').sort().join('') !== sticker2.split('').sort().join('');
}

/*export const notSamePieceByLetter = (sticker1, sticker2, type) => {
    const letterScheme = JSON.parse(localStorage.getItem("letterScheme"));
    //console.log(sticker1, Object.keys(letterScheme).find(key => letterScheme[key] === sticker1), sticker2, Object.keys(letterScheme).find(key => letterScheme[key] === sticker2), notSamePieceByName(Object.keys(letterScheme).find(key => letterScheme[key] === sticker1), Object.keys(letterScheme).find(key => letterScheme[key] === sticker2)));
    return notSamePieceByName(
        Object.keys(letterScheme).filter(key => key.length === type).find(key => letterScheme[key] === sticker1),
        Object.keys(letterScheme).filter(key => key.length === type).find(key => letterScheme[key] === sticker2)
        );
}*/

export const getTargets = (pieceType) => {
    const letterScheme = JSON.parse(localStorage.getItem("letterScheme"));

    if (!letterScheme) {
        return false;
    }

    let stickerCount = 0;
    if (pieceType === 'edge') {
        stickerCount = 2;
    } else if (pieceType === 'corner') {
        stickerCount = 3;
    }
    
    return stickers.filter(sticker => (sticker.length === stickerCount && notSamePiece(sticker, letterScheme[`${pieceType}Buffer`]))).sort((firstEl, secondEl) => (letterScheme[firstEl].localeCompare(letterScheme[secondEl])));
}


export const generatePairs = (targets) => {
    //console.log("generating pairs");
    let pairs = [];
    targets.forEach(target1 => {
        targets.forEach(target2 => {
            if (notSamePiece(target1, target2)) {
                //console.log(target1.concat(target2), pairs.includes(target1.concat(target2)));
                if ((document.getElementById("starting").checked && document.getElementById(target1).checked) || (document.getElementById("ending").checked && document.getElementById(target2).checked)) {
                    pairs.push([target1, target2]);
                }
            }
        });
    });
    //console.log(pairs);
    return pairs.sort(() => (Math.random() - 0.5));
}

export const translatePair = (pair) => {
    // Translate from [XYZ, XYZ] to 'AB'
    const letterScheme = JSON.parse(localStorage.getItem("letterScheme"));
    return letterScheme[pair[0]].concat(letterScheme[pair[1]]);
}