const jokesRandom = {

    apiUrl: 'https://cors.eu.org/https://www.blagues-api.fr/api/',

    result: [],

    answer: function () {
        let currentResponse = document.querySelector('.response');
        currentResponse.textContent = jokesRandom.result[3][1];
    },

    load: function () {

        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzQyMjYxMjE0OTU0NjUxNjYwIiwibGltaXQiOjEwMCwia2V5Ijoiejk4Y05OVjVsdW9QYmxGYmRBM3BnMzEzanJTR3RoNG16cHFsZmdZd3R2azlFMGt6QkoiLCJjcmVhdGVkX2F0IjoiMjAyMS0xMC0yMFQxMjo0NTowNyswMDowMCIsImlhdCI6MTYzNDczMzkwN30.Q2zgAESsGlYvnXZ8Y-PtgaPdilF0vr95IxwPaGkDsxc"

        let myInit = {
            method: 'GET',
            headers: {
                'Accept': 'application/json', // client can accept json
                'Content-Type': 'application/json', // client can send json
                'Authorization': 'Bearer ' + token // we add the token for the authorization
                // for chrome cors : google-chrome --disable-site-isolation-trials --disable-web-security --user-data-dir="~/tmp"
            },
        };
        fetch(jokesRandom.apiUrl + 'random', myInit) // we send the request
            .then(function (data) { // we recieve a json response
                return data.json(); // we catch the json and send a new promise
            })
            .then(function (jsonData) { // we definitly catch the json datas

                for (let currentLine in jsonData) {
                    jokesRandom.result.push([currentLine, jsonData[currentLine]]);
                }

                // adding the question to the html
                let currentRandomJoke = document.querySelector('.random');
                currentRandomJoke.textContent = jokesRandom.result[2][1];

                // adding the category tag to the html
                let currentJokeCategory = document.querySelector('.category');
                currentJokeCategory.textContent = jokesRandom.result[1][1];
            });
    },

}

document.addEventListener('DOMContentLoaded', jokesRandom.load());