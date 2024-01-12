//iPYg5-vAPSuXgXM9rSthGzUDDZykQ1B2c9Wg0cJ1vcY 
const BASE_URL = "https://api.unsplash.com/search/photos?client_id=BDCSStPov0Bl_S4aD7OaRBjG55IQcrT4qjxDSXQHmuU";
const searchInputEl = document.getElementById('search-input');
const searchButtonEl = document.getElementById('search-button');
const resultContainerEL = document.querySelector('.result-container');
const nextPageBtn = document.querySelector(".next-btn");
const prevPageBtn = document.querySelector(".prev-btn");
let page = 1;
let currentImage;
let images = [];
// vid första inladdning så sätter vi vårt sidonummer till första sidan
document.querySelector(".page-number").innerHTML = page;

async function getImageData() {
    let inputValue = searchInputEl.value;
    // greja med vår url
    let url = BASE_URL + "&page=" + page + "&query=" + inputValue;
    // hämta data från api:et
    let response = await fetch(url);
    let data = await response.json();
    images = data.results;
    // ta hämtad data och pytsa ut i gränssnittet
    renderResult(data.results);
};

searchButtonEl.addEventListener("click", () => {
    getImageData();
});

function renderResult(data) {
    // tömmer tidigare innehåll i containern, för att göra plats åt det nya
    resultContainerEL.innerHTML = "";
    data.forEach((imageData, i) => {
        // skapa det nya bildelementet
        let imageEl = document.createElement('article');
        imageEl.className += "thumbnail";
        // sparar id för bilden tills när vi klickar på den
        imageEl.id = i;
        imageEl.style.backgroundImage = `url(${imageData.urls.thumb})`;
        imageEl.style.width = "200px";
        imageEl.style.height = "200px";
        imageEl.addEventListener('click', (e) => {
            handleClickedImage(e);
        });
        // lägga in den i vår HTML
        resultContainerEL.appendChild(imageEl);
    });
};

function handleClickedImage(e) {
    console.log(e.target.id);
    const id = e.target.id;
    // få ut rätt bild från den globala arrayen med 
    // bilder genom id:t vi har som id på elementet vi klickade på
    const imageData = images[id];
    console.log(imageData);
    // spara datan till localstorage
    // datan måste göras om till json innan (pga ls tar bara strängar)
    localStorage.setItem("imageData", JSON.stringify(imageData));
    location.href = "image.html";
};

// eventlyssnare till när man klickar på nästa sida
nextPageBtn.addEventListener("click", () => {
    // uppdatera nuvarande sidonummer
    page = page + 1;
    getImageData();
    document.querySelector(".page-number").innerHTML = page;
});

// eventlyssnare till när man klickar på tidigare sida
prevPageBtn.addEventListener("click", () => {
    // uppdatera nuvarande sidonummer
    // kolla så att inte nuvarande sida är 1
    if (page > 1) {
        page = page - 1;
        getImageData();
        document.querySelector(".page-number").innerHTML = page;
    }

});