let apiUrl = 'http://localhost:8080/api/v1/quote'

let result = [];
let categoriesResult = [];
let resultByCategory = [];
let lastCategory = "";

function answer() {
    console.log(result);
    let currentResponse = document.querySelector('.response');
    currentResponse.textContent = result[3][1];
}

function load() {

    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2Mzg4NjQ2NTIsInJvbGVzIjpbIlJPTEVfQ0FUQUxPR19NQU5BR0VSIiwiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWRtaW5AYWRtaW4uY29tIn0.QwND0lQ7hex1o0DUDQxsNrYfQNT67E3JGd8j8-4XmJ-3IXd5rwLUKnATGGbCIsW7chHAmNkvXDaQrBwg2Sc6ZEMEY70HFTj6ujjWNRnQNa-EOtDs1jZIeYuRtOK0BV9IWXgCy0ikX_IHeQEXnoL9cPLV1QxFY4IYFTRkQPtK86Kg2i9ATzEJhm4ybA5lWHPB_M94RCy_OZWApSKQSX-XzDtHnNF0tdvgJhMiCSUO6TjTXIcMinPL6S2Q0tYBxVw4M8-X7vQhvUVeHLNikxfDyFF1SlIpP6sziDR1k_vOIB8nE5wyU7vDcnOsBXKLApw8JZUoYn0V8R3nAgxybsroPQ"

    let myInit = {
        method: 'GET',
        headers: {
            'Accept': 'application/json', // client can accept json
            'Content-Type': 'application/json', // client can send json
            'Authorization': 'Bearer ' + token // we add the token for the authorization
        },
    };
    fetch(apiUrl, myInit) // we send the request
        .then(function (data) { // we recieve a json response
            return data.json(); // we catch the json and send a new promise
        })
        .then(function (jsonData) { // we definitly catch the json datas

            for (let currentLine in jsonData) {
                result.push([currentLine, jsonData[currentLine]]);
            }

            for (var currentQuote of result) {

                // we'll just add unique categories
                if (categoriesResult.includes(currentQuote[1].category.name) === false) {

                    var categoriesList = document.querySelector('.categories-list');

                    var newCategoryButton = document.createElement('button');
                    newCategoryButton.setAttribute("value", currentQuote[1].category.name);
                    newCategoryButton.setAttribute("onclick", "showCategory(value)");
                    newCategoryButton.classList.add("btn-category");
                    newCategoryButton.setAttribute('value', currentQuote[1].category.name);

                    var newCategory = document.createElement('li');
                    newCategory.textContent = currentQuote[1].category.name;
                    newCategoryButton.append(newCategory);
                    categoriesList.append(newCategoryButton);
                }

                categoriesResult.push(currentQuote[1].category.name);
            }
        });
}

function showCategory(selectedCategory) {

    for (var currentQuote of resultByCategory) {

        //removing old blocks of other categories
        var page = document.querySelector('.page');
        var blockList = document.querySelector('.block-list');
        page.removeChild(blockList);
    }
    
    resultByCategory = [];

    for (var currentQuote of result) {
        if (currentQuote[1].category.name == selectedCategory) {
            resultByCategory.push(currentQuote)
        }
    }

    for (var currentQuote of resultByCategory) {

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
    
    lastCategory = selectedCategory;
}

document.addEventListener('DOMContentLoaded', load());