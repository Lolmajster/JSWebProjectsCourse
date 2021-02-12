const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

let photoCount = 5;
const apiKey = 'uVqRIcM4eEEzQFmoBmTGe8epZ-HXaF4S49cCqTYH7tc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photoCount}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        photoCount = 30;
    }
}

function setAtrributesHelper(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function createImagesDomCollection() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
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

        // Event Listener, check when each is finished loading
        image.addEventListener('load', imageLoaded);

        // Create elements collection
        item.appendChild(image);
        imgContainer.appendChild(item);
    });
}

async function getPhotosFormUnsplashApi() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        createImagesDomCollection();
    } catch (error) {
        
    }
}

// Check to see if scrolling near bottom of page, then load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotosFormUnsplashApi();
    }
})

getPhotosFormUnsplashApi();