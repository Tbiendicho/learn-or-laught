const jokesCategories = {

    apiUrl: "https://cors.eu.org/https://www.blagues-api.fr/api/type/",

    result: [],

    //we'll catch the answer in the result array and put it in the DOM
    answer: function () {
        let currentResponse = document.querySelector('.response');
        currentResponse.textContent = jokesCategories.result[3][1];
    },

    showCategories: function (category) {

        let hideCategory = document.querySelector('.category');
        hideCategory.style = "";

        if (category == "") {
            category = jokesCategories.result[1][1]
        }

        jokesCategories.result = [];
        let currentResponse = document.querySelector('.response');
        currentResponse.textContent = "";

        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzQyMjYxMjE0OTU0NjUxNjYwIiwibGltaXQiOjEwMCwia2V5Ijoiejk4Y05OVjVsdW9QYmxGYmRBM3BnMzEzanJTR3RoNG16cHFsZmdZd3R2azlFMGt6QkoiLCJjcmVhdGVkX2F0IjoiMjAyMS0xMC0yMFQxMjo0NTowNyswMDowMCIsImlhdCI6MTYzNDczMzkwN30.Q2zgAESsGlYvnXZ8Y-PtgaPdilF0vr95IxwPaGkDsxc"

        let myInit = {
            method: 'GET',
            headers: {
                'Accept': 'application/json', // client can accept json
                'Content-Type': 'application/json', // client can send json
                'Authorization': 'Bearer ' + token // we add the token for the authorization
            },
        };

        fetch(jokesCategories.apiUrl + category + '/random', myInit) // we send the request
            .then(function (data) { // we recieve a json response
                return data.json(); // we catch the json and send a new promise
            })
            .then(function (jsonData) { // we definitly catch the json datas

                for (let currentLine in jsonData) {

                    jokesCategories.result.push([currentLine, jsonData[currentLine]]);
                }

                // adding the question to the html
                let currentRandomJoke = document.querySelector('.random');
                currentRandomJoke.textContent = jokesCategories.result[2][1];

                // adding the category tag to the html
                let currentJokeCategory = document.querySelector('.category');
                currentJokeCategory.textContent = category;
            });
    },
}