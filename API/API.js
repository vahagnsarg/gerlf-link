import React from 'react';

export function getHandicap(handicapNumber){

    return fetch(`http:localhost:8080/api/v1/getHandicap?handicap=${handicapNumber}&months=0`)
        .then(response => response.json())
        .then(data => {
            return data
    }
);

}