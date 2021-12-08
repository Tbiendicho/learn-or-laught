function showButton(value) {

    // hidding the first buttons
    let oldButtons = document.querySelector('.categories-list');
    let main = document.querySelector('.main-text');
    oldButtons.setAttribute('hidden', true);
    main.setAttribute('hidden', true);

    // hidding the text for the both choice
    let bothText = document.querySelector('.both-text');
    if (bothText) {
        bothText.setAttribute('hidden', true);
    }

    // creating the new buttons for categories choice
    let newButtons = document.createElement('div');
    newButtons.classList.add('d-flex', 'justify-content-center', 'mx-auto');
    let block = document.querySelector('.block');

    let categoryButtonYes = document.createElement('button');
    let categoryButtonNo = document.createElement('button');
    newButtons.append(categoryButtonNo, categoryButtonYes);

    categoryButtonYes.classList.add('btn-main', 'w-75', 'mx-0', 'p-2');
    categoryButtonYes.textContent = "Choisir une catégorie";
    categoryButtonYes.href = 'https://google.fr';

    let linkForCategories = document.createElement('a');
    linkForCategories.classList.add('w-75');
    linkForCategories.href = "http://localhost:8000/" + value + "/categories"

    let linkForRandom = document.createElement('a');
    linkForRandom.classList.add('w-75');
    linkForRandom.href = "http://localhost:8000/" + value + "/random"

    block.append(linkForCategories, linkForRandom);
    linkForCategories.append(categoryButtonYes);
    linkForRandom.append(categoryButtonNo);

    categoryButtonNo.classList.add('btn-main', 'w-75', 'mx-0', 'p-2');

    categoryButtonNo.textContent = "Aléatoire";
}

function showAnswer() {

    // creating a text for the both choice
    let bothButton = document.querySelector('.both-btn');

    let textForBoth = document.createElement('p');
    textForBoth.classList.add('text', 'both-text')
    textForBoth.textContent = "Donc visiblement tu es plutôt drôle, choisis la seconde catégorie, celle en vert là !"

    let newColorButton = document.querySelector('.btn-funny');
    newColorButton.setAttribute('style', 'background-color: #11D3BC');

    let block = document.querySelector('.block');
    block.append(textForBoth);

    // hidding the old button for both choice
    bothButton.setAttribute('hidden', true);
}