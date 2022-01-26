import { stickers, cornersRotations } from '../helpers/stickers';
import Cubejs from 'cubejs';

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

export const performCycle = (cycle) => {
    const [t1, t2, t3] = cycle;
    let cubejsStickers = [];
    ["U", "R", "F", "D", "L", "B"].forEach((face) => {
        cubejsStickers.push(...stickers.filter((sticker) => (sticker[0]===face)))
    });

    if (t1.length===2) {    // Edge cycle
        const [ot1, ot2, ot3] = cycle.map((piece) => {
          return `${piece[1]}${piece[0]}`
        });

        const t1Index = cubejsStickers.indexOf(t1);
        const t2Index = cubejsStickers.indexOf(t2);
        const t3Index = cubejsStickers.indexOf(t3);
        const ot1Index = cubejsStickers.indexOf(ot1);
        const ot2Index = cubejsStickers.indexOf(ot2);
        const ot3Index = cubejsStickers.indexOf(ot3);

        let buff = t1;
        cubejsStickers[t1Index] = t2;
        cubejsStickers[t2Index] = t3;
        cubejsStickers[t3Index] = buff;
        buff = ot1;
        cubejsStickers[ot1Index] = ot2;
        cubejsStickers[ot2Index] = ot3;
        cubejsStickers[ot3Index] = buff;

        return cubejsStickers.map((sticker) => (sticker[0])).join("");
    } else if (t1.length===3) { // Corner cycle
        const [cwt1, cwt2, cwt3] = cycle.map((piece) => {
            // encontrar el sticker horario
                // encontrar el sentido
            const rotation = cornersRotations.find((rotation) => (!notSamePiece(rotation, piece)));
                // ubicar la siguiente en ese sentido (la que viene despues de piece[0])
            const nextFace = rotation[(rotation.indexOf(piece[0])+1)%3];
            // encontrar la pieza con el formato correcto
            return stickers.find((sticker) => (sticker[0]===nextFace && !notSamePiece(sticker, piece)));
        });
        const [acwt1, acwt2, acwt3] = cycle.map((piece) => {
            // encontrar el sticker horario
                // encontrar el sentido
            const rotation = cornersRotations.find((rotation) => (!notSamePiece(rotation, piece)));
                // ubicar la siguiente en ese sentido (la que viene despues de piece[0])
            const nextFace = rotation[(rotation.indexOf(piece[0])+2)%3];
            // encontrar la pieza con el formato correcto
            return stickers.find((sticker) => (sticker[0]===nextFace && !notSamePiece(sticker, piece)));
        });

        const t1Index = cubejsStickers.indexOf(t1);
        const t2Index = cubejsStickers.indexOf(t2);
        const t3Index = cubejsStickers.indexOf(t3);
        const cwt1Index = cubejsStickers.indexOf(cwt1);
        const cwt2Index = cubejsStickers.indexOf(cwt2);
        const cwt3Index = cubejsStickers.indexOf(cwt3);
        const acwt1Index = cubejsStickers.indexOf(acwt1);
        const acwt2Index = cubejsStickers.indexOf(acwt2);
        const acwt3Index = cubejsStickers.indexOf(acwt3);

        let buff = t1;
        cubejsStickers[t1Index] = t2;
        cubejsStickers[t2Index] = t3;
        cubejsStickers[t3Index] = buff;
        buff = cwt1;
        cubejsStickers[cwt1Index] = cwt2;
        cubejsStickers[cwt2Index] = cwt3;
        cubejsStickers[cwt3Index] = buff;
        buff = acwt1;
        cubejsStickers[acwt1Index] = acwt2;
        cubejsStickers[acwt2Index] = acwt3;
        cubejsStickers[acwt3Index] = buff;
        
        return cubejsStickers.map((sticker) => (sticker[0])).join("");
    }
}

export const validateComm = (comm, alg) => {
    try {
        const parsedAlg = Scramble.parse(alg);
        const cubejs = new Cubejs(Cubejs.fromString(performCycle(comm)));
        cubejs.move(parsedAlg);
        return cubejs.isSolved();
    } catch {
        return false;
    }
}


export class Scramble {
    static parse (scramble) {
      const parseModifiers = function (modifiersString) {
        let modifiers = []
        let suffix = modifiersString
        while (true) {
          let modifier = ''
          if (suffix[0] === "'") modifier = "'"
          else {
            modifier = suffix.match(/^[0-9]+/)
            if (modifier === null) modifier = ''
            else modifier = modifier[0]
          }
          if (modifier.length === 0) break
          modifiers.push(modifier)
          suffix = suffix.substring(modifier.length)
        }
        return modifiers
      }
      // parsing commutators and conjugates
      const parseSpecial = function (scramble) {
        const info = Scramble._special(scramble)
        const left = Scramble._joinTokens(info.leftTokens)
        const right = Scramble._joinTokens(info.rightTokens)
        if (info.type === ',') return [left, right, Scramble.inverse(left), Scramble.inverse(right)].join(' ')
        else if (info.type === ':') return [left, right, Scramble.inverse(left)].join(' ')
        else return left
      }
      const applyModifiers = function (token) {
        const modifiers = parseModifiers(token.modifiers)
        let moves = token.moves
        if ('({'.indexOf(moves[0]) !== -1) moves = Scramble.parse(moves.substring(1, moves.length - 1))
        else if ('['.indexOf(moves[0]) !== -1) {
          moves = Scramble.parse(parseSpecial(moves))
        }
        for (const i in modifiers) {
          const modifier = modifiers[i]
          if (modifier === "'") moves = Scramble.inverse(moves)
          else {
            const number = parseInt(modifier)
            moves = Array(number).fill(moves).join(' ')
          }
        }
        return moves
      }
      const tokens = Scramble._tokenize(scramble).map(token => applyModifiers(token))
      return tokens.join(' ')
    }
    static inverse (scramble) {
      // invert commutators and conjugates
      const inverseSpecial = function (scramble) {
        const info = Scramble._special(scramble)
        if (info.type === ',') return '[' + Scramble._joinTokens(info.rightTokens) + ', ' + Scramble._joinTokens(info.leftTokens) + ']'
        else if (info.type === ':') return '[' + Scramble._joinTokens(info.leftTokens) + ': ' + Scramble.inverse(Scramble._joinTokens(info.rightTokens)) + ']'
        return scramble
      }
      const inverseToken = function (token) {
        let modifiers = token.modifiers
        if (modifiers.length !== 0 && modifiers[modifiers.length - 1] === "'") {
          modifiers = modifiers.substring(0, modifiers.length - 1)
          return token.moves + modifiers
        }
        if (token.moves[0] === '[') token.moves = inverseSpecial(token.moves)
        else modifiers += "'"
        return token.moves + modifiers
      }
      return Scramble._tokenize(scramble).map(token => inverseToken(token)).reverse().join(' ')
    }
    static _tokenize (scramble) {
      const firstToken = function (scramble) {
        const firstMove = scramble.match(/^[A-Za-z]+[0-9']*/)
        if (firstMove !== null) {
          const moves = firstMove[0].match(/[A-Za-z]+/)[0]
          const suffix = scramble.substring(moves.length)
          let modifiers = suffix.match(/^[0-9']+/)
          if (modifiers === null) modifiers = ''
          else modifiers = modifiers[0]
          return {
            moves,
            modifiers
          }
        }
        const groups = '()[]{}'
        let groupsCount = [0, 0, 0]
        for (const i in scramble) {
          const index = groups.indexOf(scramble[i])
          if (index >= 0) {
            const group = Math.floor(index / 2)
            if (index % 2) groupsCount[group]--
            else groupsCount[group]++
          }
          let isOk = true
          for (const group in groupsCount) {
            isOk = isOk && (groupsCount[group] === 0)
          }
          if (isOk) {
            const moves = scramble.substring(0, parseInt(i) + 1)
            const suffix = scramble.substring(parseInt(i) + 1)
            let modifiers = suffix.match(/^[0-9']+/)
            if (modifiers === null) modifiers = ''
            else modifiers = modifiers[0]
            return {
              moves,
              modifiers
            }
          }
        }
      }
  
      let tokens = []
      let suffix = scramble
      while (true) {
        const beginToken = suffix.match(/[A-Za-z[({]/)
        if (beginToken === null) break
        const index = beginToken.index
        const token = firstToken(suffix.substring(index))
        if (token === null) break
        tokens.push(token)
        suffix = suffix.substring(index + token.moves.length)
      }
      return tokens
    }
    static _joinTokens (tokens) {
      return tokens.map(token => token.moves + token.modifiers).join(' ')
    }
    // get more information about commutator or conjugate
    static _special (scramble) {
      if (scramble[0] !== '[' || scramble[scramble.length - 1] !== ']') return null
      scramble = scramble.substring(1, scramble.length - 1).trim()
      const tokens = Scramble._tokenize(scramble)
      let info = {
        leftTokens: [],
        rightTokens: [],
        type: ''
      }
      for (const i in tokens) {
        if (',:'.indexOf(scramble[0]) !== -1) {
          info.type = scramble[0]
          scramble = scramble.substring(1).trim()
        }
        const token = tokens[i]
        if (info.type === '') info.leftTokens.push(token)
        else info.rightTokens.push(token)
        scramble = scramble.replace(token.moves + token.modifiers, '').trim()
      }
      return info
    }
  }