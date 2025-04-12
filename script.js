const searchForm = document.getElementById('search-form');
const searchBar = document.getElementById('search-bar');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;

// search images function

async function searchImages(){
    keyword = searchBar.value;
    const url = `/.netlify/functions/search?query=${keyword}&page=${page}`;


    const response = await fetch(url);
    const data = await response.json();

// clears the previous images/search result

    if(page === 1){
        searchResult.innerHTML = '';
    }
    
    const results = data.results;

// display images

    results.map((result) => {
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMoreBtn.style.display = 'block';
}
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
})

// show more button - displays another page of images

showMoreBtn.addEventListener('click', () => {
    page++;
    searchImages();
})