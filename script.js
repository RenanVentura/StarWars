let currentPageURL = 'https://swapi.dev/api/people/';

window.onload = async () => {
    
    try {
       await loadCharacters (currentPageURL);
    } 
    
    catch (error) {
        console.log(error);
        alert('Error ao carregar Cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
} ;

async function loadCharacters (url){
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try{
        
        const response = await fetch(url);
        const responseJSON = await response.json();

        responseJSON.results.forEach((character) =>{
            const card = document.createElement("div")
            
            card.style.backgroundImage = ` url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            card.className="cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-Name-BG";

            const characterName = document.createElement("span")
            characterName.className = "character-name";
            characterName.innerText = `${character.name}`

           characterNameBG.appendChild(characterName);
            card.appendChild(characterNameBG);
            mainContent.appendChild(card);
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')
        
        nextButton.disable = !responseJSON.next
        nextButton.disable = !responseJSON.previous
        
        backButton.style.visibility = responseJSON.previous? "visible" : "hidden"

        
        currentPageURL = url
    }
    
    catch (error){
        console.log('Erro ao carregar os personagens');
        alert(error)
    }

}

async function loadNextPage (){
    if(!currentPageURL) return;

    try {
        const response = await fetch(currentPageURL)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    }catch (error) {
        console.log(error)
        alert('Erro ao carregar a proóxima página')
    }
}

async function loadPreviousPage (){
    if(!currentPageURL) return;

    try {
        const response = await fetch(currentPageURL)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    }catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}