function populateCarouselContainer() {
    const imageContainer = document.getElementById("best-movies");
    // Array of image URLs
    const imageUrls = ["https://m.media-amazon.com/images/M/MV5BMjEwNzM1MjA1MF5BMl5BanBnXkFtZTcwMjcwMzIyMQ@@._V1_UY268_CR3,0,182,268_AL_.jpg",
        "https://m.media-amazon.com/images/M/MV5BMTY3Njc5MDIzMl5BMl5BanBnXkFtZTcwNzA5ODQyMQ@@._V1_UY268_CR1,0,182,268_AL_.jpg",
        "https://m.media-amazon.com/images/M/MV5BMGVjYWE5MTAtMTY4ZS00OWVhLWJhNmQtYWY4ZTUzZjZiMTY5XkEyXkFqcGdeQXVyMjExMjI5NzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "https://m.media-amazon.com/images/M/MV5BZWI4NTA0MGQtZGE2Yi00ZDc0LTkyNTItNjE1ZGMxYWZjOTkxXkEyXkFqcGdeQXVyNzAyNTY2MjY@._V1_UY268_CR108,0,182,268_AL_.jpg",
        "https://m.media-amazon.com/images/M/MV5BZWI4NTA0MGQtZGE2Yi00ZDc0LTkyNTItNjE1ZGMxYWZjOTkxXkEyXkFqcGdeQXVyNzAyNTY2MjY@._V1_UY268_CR108,0,182,268_AL_.jpg",
        "https://m.media-amazon.com/images/M/MV5BZWI4NTA0MGQtZGE2Yi00ZDc0LTkyNTItNjE1ZGMxYWZjOTkxXkEyXkFqcGdeQXVyNzAyNTY2MjY@._V1_UY268_CR108,0,182,268_AL_.jpg",
        "https://m.media-amazon.com/images/M/MV5BZWI4NTA0MGQtZGE2Yi00ZDc0LTkyNTItNjE1ZGMxYWZjOTkxXkEyXkFqcGdeQXVyNzAyNTY2MjY@._V1_UY268_CR108,0,182,268_AL_.jpg"];

    // Loop through the image URLs and create <img> elements
    for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];

        // Create a <div> element
        const divElement = document.createElement("div");

        // Create an <img> element
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Image " + (i + 1);
        imgElement.style.width = '273px';
        imgElement.style.height = '402px';

        // Append the <img> element to the <div>
        divElement.appendChild(imgElement);

        // Append the <div> element to the image container
        imageContainer.appendChild(divElement);
    }
}
populateCarouselContainer()

class Carousel {
    /** 
     * @param (HTMLElement) element
     * @param (Objet) options
    */
    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({ slideToScroll: 7, slideVisible: 3 }, options)
        this.children = [].slice.call(element.children)
        let ratio = this.children.length / this.options.slideVisible
        let root = this.createDivWithClass('carousel')
        let container = this.createDivWithClass('carousel-container')
        container.style.width = (ratio *100) + "%"
        root.appendChild(container)
        this.element.appendChild(root)
        this.children.forEach((child) => { 
            let div = this.createDivWithClass('carousel-item');
            div.style.width = ((100/ this.options.slideVisible) / ratio) +"%"
            div.appendChild(child);
            container.appendChild(div);
        })

    }

    createDivWithClass(className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}



document.addEventListener("DOMContentLoaded", function () {

    new Carousel(document.querySelector('#best-movies'), {
        slideToScroll: 7,
        slideVisible: 3
    })
})