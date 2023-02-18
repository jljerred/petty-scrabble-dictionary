const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
volume = wrapper.querySelector(".word i"),
infoText = wrapper.querySelector(".info-text"),
removeIcon = wrapper.querySelector(".search span");
let audio;
//data function
function data(result, word){
    //if characters entered is not an English word
    if(result.title){
        //error message if characters entered not word
        infoText.innerHTML = ` <span>"${word}"</span> is not a word. Your turn is forfeited.`;
        //if characters entered form a word
    }else{
        wrapper.classList.add("active");
        //display word, definition, and phonetics 
        let definitions = result[0].meanings[0].definitions[0],
        phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        audio = new Audio(result[0].phonetics[0].audio);
    }
}
//search function
function search(word){
    fetchApi(word);
    searchInput.value = word;
}
//fetch API
function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    //text that replaces "Is it a word" message while fetch is made
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(response => response.json()).then(result => data(result, word)).catch(() =>{
        //display this msg if not a word:
        infoText.innerHTML = ` <span>"${word}"</span> is not a word. Your turn is forfeited.`;
    });
}
//mounting and unmounting event listeners
searchInput.addEventListener("keyup", e =>{
    let word = e.target.value.replace(/\s+/g, ' ');
    if(e.key == "Enter" && word){
        fetchApi(word);
    }
});
volume.addEventListener("click", ()=>{
    volume.style.color = "red";
    audio.play();
    setTimeout(() =>{
        volume.style.color = "#999";
    }, 800);
});
removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Type here to see if your word is a real word";
});