

export const bestRound = rounds =>{
    let highestRound = '0';

    for(let x in rounds){
        if(rounds[x].isOutOfMaxRound){
            continue;
        }
        if(rounds[x].handicappingScore > highestRound && rounds[x].handicappingScore !== 'N/A'){
            highestRound = rounds[x].handicappingScore;
        }
    }
    return highestRound;
}

export const  worstRound = rounds =>{
    let lowestRound = 100;

    for(let x in rounds){
        if(rounds[x].isOutOfMaxRound){
            continue;
        }
        if(rounds[x].handicappingScore < lowestRound && rounds[x].handicappingScore !== 'N/A'){
            lowestRound = rounds[x].handicappingScore;
        }
    }

    return lowestRound;
}

export const averageRound = rounds =>{
    let totalRoundScore = 0;
    let noOfRounds = 0;

    for(let x in rounds){
        if(rounds[x].isOutOfMaxRound){
            continue;
        }
        if(rounds[x].handicappingScore !== 'N/A'){
            totalRoundScore = totalRoundScore + parseInt(rounds[x].handicappingScore);
            noOfRounds++;
        }
    }
    let avereageScrore = Math.floor(totalRoundScore/noOfRounds);
    return avereageScrore;
}

export const neededRound = rounds => {
    let top8Score = 0;
    let lastRoundFlagged = {
        flagged: false,
        slopedPlayedTo: 0
    };

    for(let x in rounds){
        if(rounds[x].isOutOfMaxRound){
            continue;
        }
        if(rounds[x].top8ScoreFlag){
            top8Score = top8Score + parseInt(rounds[x].slopedPlayedTo);
        }

        if(x === 19 && rounds[x].top8ScoreFlag){
            lastRoundFlagged.flagged = true;
            lastRoundFlagged.slopedPlayedTo = rounds[x].slopedPlayedTo;
        }
    }

    if(lastRoundFlagged.flagged){
        return lastRoundFlagged.slopedPlayedTo;
    }else{
        //Caluclate this fucker
        return '🤷🏼‍♂'
    }
}