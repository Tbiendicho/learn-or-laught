const quotesByCategory = {

    apiUrl: 'https://apilol.thomas-biendicho.fr/api/v1/quote',

    result: [],
    categoriesResult: [],
    resultByCategory: [],
    lastCategory: "",

    answer: function () {
        let currentResponse = document.querySelector('.response');
        currentResponse.textContent = quotesByCategory.result[3][1];
    },

    load: function () {

        let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2Mzg4NjQ2NTIsInJvbGVzIjpbIlJPTEVfQ0FUQUxPR19NQU5BR0VSIiwiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWRtaW5AYWRtaW4uY29tIn0.QwND0lQ7hex1o0DUDQxsNrYfQNT67E3JGd8j8-4XmJ-3IXd5rwLUKnATGGbCIsW7chHAmNkvXDaQrBwg2Sc6ZEMEY70HFTj6ujjWNRnQNa-EOtDs1jZIeYuRtOK0BV9IWXgCy0ikX_IHeQEXnoL9cPLV1QxFY4IYFTRkQPtK86Kg2i9ATzEJhm4ybA5lWHPB_M94RCy_OZWApSKQSX-XzDtHnNF0tdvgJhMiCSUO6TjTXIcMinPL6S2Q0tYBxVw4M8-X7vQhvUVeHLNikxfDyFF1SlIpP6sziDR1k_vOIB8nE5wyU7vDcnOsBXKLApw8JZUoYn0V8R3nAgxybsroPQ"

        let myInit = {
            method: 'GET',
            headers: {
                'Accept': 'application/json', // client can accept json
                'Content-Type': 'application/json', // client can send json
                'Authorization': 'Bearer ' + token // we add the token for the authorization
            },
        };
        fetch(quotesByCategory.apiUrl, myInit) // we send the request
            .then(function (data) { // we recieve a json response
                return data.json(); // we catch the json and send a new promise
            })
            .then(function (jsonData) { // we definitly catch the json datas

                for (let currentLine in jsonData) {
                    quotesByCategory.result.push([currentLine, jsonData[currentLine]]);
                }

                for (var currentQuote of quotesByCategory.result) {

                    // we'll just add unique categories
                    if (quotesByCategory.categoriesResult.includes(currentQuote[1].category.name) === false) {

                        var categoriesList = document.querySelector('.categories-list');

                        var newCategoryButton = document.createElement('button');
                        newCategoryButton.setAttribute("value", currentQuote[1].category.name);
                        newCategoryButton.setAttribute("onclick", "quotesByCategory.showCategory(value)");
                        newCategoryButton.classList.add("btn-category");
                        newCategoryButton.setAttribute('value', currentQuote[1].category.name);

                        var newCategory = document.createElement('li');
                        newCategory.textContent = currentQuote[1].category.name;
                        newCategoryButton.append(newCategory);
                        categoriesList.append(newCategoryButton);
                    }

                    quotesByCategory.categoriesResult.push(currentQuote[1].category.name);
                }
            });
    },

    showCategory: function (selectedCategory) {

        for (var currentQuote of quotesByCategory.resultByCategory) {

            //removing old blocks of other categories
            var page = document.querySelector('.page');
            var blockList = document.querySelector('.block-list');
            page.removeChild(blockList);
        }

        quotesByCategory.resultByCategory = [];

        for (var currentQuote of quotesByCategory.result) {
            if (currentQuote[1].category.name == selectedCategory) {
                quotesByCategory.resultByCategory.push(currentQuote)
            }
        }

        for (var currentQuote of quotesByCategory.resultByCategory) {

            // creating blockList
            var page = document.querySelector('.page');
            var blockList = document.createElement('div');
            blockList.classList.add('block-list');
            page.append(blockList);

            // adding a new block
            var blockList = document.querySelector('.block-list');
            var newBlock = document.createElement('div');
            newBlock.classList.add('block', 'col-10', 'col-lg-4', 'mx-auto');
            blockList.append(newBlock);

            // adding a new category
            var newCategoryBlock = document.createElement('div');
            newBlock.append(newCategoryBlock);
            var newCategory = document.createElement('p');
            newCategory.classList.add('d-inline-flex', 'p-2', 'category');
            newCategory.textContent = currentQuote[1].category.name;
            newCategoryBlock.append(newCategory);

            // adding a new title
            var newTitle = document.createElement('p');
            newTitle.classList.add('title-text');
            newTitle.textContent = currentQuote[1].title;
            newBlock.append(newTitle);

            // adding a new quote text
            var newQuote = document.createElement('p');
            newQuote.classList.add('text');
            newQuote.textContent = currentQuote[1].text;
            newBlock.append(newQuote);

            // adding a new link for the button
            var newLink = document.createElement('a');
            newLink.setAttribute('href', currentQuote[1].source)
            newBlock.append(newLink);

            // adding a new button for the source
            var newButton = document.createElement('button');
            newButton.classList.add('btn');
            newButton.textContent = 'Source';
            newBlock.append(newButton);
            newLink.append(newButton);

        }

        quotesByCategory.lastCategory = selectedCategory;
    }

}

document.addEventListener('DOMContentLoaded', quotesByCategory.load());