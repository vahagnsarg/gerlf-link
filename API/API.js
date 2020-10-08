import global from '../config/global';

// export function getHandicap(handicapNumber){

//     return fetch(`http:localhost:8080/api/v1/getHandicap?handicap=${handicapNumber}&months=0`)
//         .then(response => response.json())
//         .then(data => {
//             return data
//         }
//     );
// }

export const getHandicap = handicapNumber => {
            //fetch(`http:localhost:8080/api/v1/getHandicap?handicap=${handicapNumber}&months=0`)
    return fetch(`https://api.golf.org.au/golfau/v1/public/v3/handicaphistory?golfLinkNo=${handicapNumber}&months=0`, {
                headers: { 
                        'Connection': 'keep-alive', 
                        'Pragma': 'no-cache', 
                        'Cache-Control': 'must-revalidate, private', 
                        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjRBRTNDMkI3NTgxMUZGODhBMUM5RUI2M0Y3QjY5NEZBRDg2NUQ0QkUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJTdVBDdDFnUl80aWh5ZXRqOTdhVS10aGwxTDQifQ.eyJuYmYiOjE2MDIxMjkxMjYsImV4cCI6MTYwMjEzMjcyNiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5nb2xmLm9yZy5hdSIsImF1ZCI6WyJodHRwczovL2lkZW50aXR5LmdvbGYub3JnLmF1L3Jlc291cmNlcyIsIkdBIEFQSSJdLCJjbGllbnRfaWQiOiJHQS5BUEkuQ0xJRU5UIiwic3ViIjoiMzcxOTAiLCJhdXRoX3RpbWUiOjE1OTE0ODI0NDMsImlkcCI6ImxvY2FsIiwiVXNlck5hbWUiOiJ2YWhhZ24uc2FyZ0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsInNjb3BlIjpbIkdBLkFQSSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.lu3RnPMgMXPRAcnvQPEUPjTQaaAcOZ8ZZ1Jmlw02HckF12KUbnhNa74bAbIHMXlFxg9lQQX07HJq9NdnxqvFIm0TN8sTOEIOlph6JPf9SqmKBIM_7zVX3dlg0aV0vpfuCBTMKe39eeDak-WBYabToOtMsGbqWFyuYEhJPyAerq9aVbjeRLq27S-CfE1PUuaY6zLJlFlWPzG3dsXt8HNINFoo1WTTC6hpkIP-TtyvUjjE7hl6uOeE2Melqu2_LAqkONeY6nnTxtJCWJCLPgst7t2ym14PH_IVEu8TGOIUAj4cqc13LGF0vW2ChBUIknq1lJFEOQJoCVG9Jd_J9cy5Xw', 
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36', 
                        'Ocp-Apim-Subscription-Key': global.authToken, 
                        'Expires': '-1', 
                        'Accept': '*/*', 
                        'Sec-Fetch-Site': 'same-site', 
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Dest': 'empty',
                        "Access-Control-Allow-Origin":  "https://api.golf.org.au",
                        'Referer': `https://www.golf.org.au/handicap/?golfLinkNo=${handicapNumber}`, 
                        'Accept-Encoding': 'gzip, deflate, br', 
                        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
                    }
                })
};


export const getToken = userName => {
    
};
