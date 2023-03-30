// console.log('%c HI', 'color: firebrick')
let breeds = [];

document.addEventListener("DOMContentLoaded", function() {
    fetchDogImages();
    fetchDogBreeds();
})

function fetchDogImages(){
    const imgurl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgurl)
    .then(function(response){
       return response.json();
    })
    .then(function(imageResults){
        return imageResults.message.forEach(Image => RenderImages(image))
    });
}

function RenderImages(dogImages) {
    const dogContainer = document.getElementById("dog-image-container");
    const img = document.createElement("img");
    img.src = dogImages;
    dogContainer.appendChild(img);
};

function fetchDogBreeds () {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(breedUrl)
    .then(function (response) {
        return response.json ();
    })
    .then(breedResults => {
        breeds = Object.keys(breedResults.message);
        renderBreeds(breeds);
        addBreedSelectListener();
    });
}

function RenderBreeds (breeds) {
    let breedList = document.getElementById("dog-breeds");
    removeChildren(breedList);
    breeds.forEach(breed => addDogBreed(breed))
}

function removeChildren(element) {
    let child = element.lastElementChild
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function filterDogBreedsUsingLetter(startingLetter) {
    RenderBreeds(breeds.filter(breed => breed.startsWith(startingLetter)));
}

function addBreedSelectListener () {
    let dogBreedDropdown = document.getElementById("breed-dropdown");
    dogBreedDropdown.addBreedSelectListener("change", function (event){
        filterDogBreedsUsingLetter(event.target.value);
    });
}

function addDogBreed (breed) {
    let breedList = document.getElementById("dog-breeds");
    let list = document.createAttribute.createElement("li");
    list.innerText = breed;
    list.style.cursor = "pointer";
    breedList.apppendChild(list);
    list.addEventListener("click", updateColor);
}

function updateColor (event) {
    event.target.style.color = "blue";
}

