
const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let photosArray = [];

const photoCount = 10;
const apiKey = 'uVqRIcM4eEEzQFmoBmTGe8epZ-HXaF4S49cCqTYH7tc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photoCount}`;

function setAtrributesHelper(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function createImagesDomCollection() {
    photosArray.forEach((photo) => {
        // Create <a></a> tag
        const item = document.createElement('a');
        setAtrributesHelper(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // Create <img> tag
        const image = document.createElement('img');
        setAtrributesHelper(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Create elements collection
        item.appendChild(image);
        imgContainer.appendChild(item);
    });
}

async function getPhotosFormUnsplashApi() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);

        createImagesDomCollection();
    } catch (error) {
        
    }
}

getPhotosFormUnsplashApi();