const urlsBestFantasy = "http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=&genre_contains=fantasy&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=2&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year="

function populateCarouselContainer() {
    const imageContainer = document.getElementById("best-fantasy");
    fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre_contains=drama&page_size=8")
        .then(response => response.json())
        .then(data => {
            // Récupérer les 7 premiers résultats
            const results = data.results.slice(0, 7);
            console.log(results);
            // Utiliser les résultats comme vous le souhaitez
            // ...
            // Loop through the image URLs and create <img> elements
            for (let i = 0; i < results.length; i++) {
                const movie = results[i];
                const imageUrl = movie.image_url;

                // Create a <div> element
                const divElement = document.createElement("div");

                // Create a <div> element
                const pElement = document.createElement("p");
                pElement.innerHTML = "titre"



                // Create an <img> element
                const imgElement = document.createElement("img");
                imgElement.src = imageUrl;
                imgElement.alt = "Image " + (i + 1);

                imgElement.style.width = '273px';
                imgElement.style.height = '402px';

                // Create an <a> element
                const aElement = document.createElement("a");
                aElement.href = imageUrl; // Set the href to the URL you want to navigate to

                // Append the <img> element to the <a> element
                aElement.appendChild(imgElement);

                // Append the <a> element to the <div>
                divElement.appendChild(pElement);
                divElement.appendChild(aElement);

                // Append the <div> element to the image container
                imageContainer.appendChild(aElement);

            }
        });
}



function populateCarouselContainer_old() {
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

        // Create a <div> element
        const pElement = document.createElement("p");
        pElement.innerHTML = "titre"



        // Create an <img> element
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Image " + (i + 1);

        imgElement.style.width = '273px';
        imgElement.style.height = '402px';

        // Create an <a> element
        const aElement = document.createElement("a");
        aElement.href = imageUrl; // Set the href to the URL you want to navigate to

        // Append the <img> element to the <a> element
        aElement.appendChild(imgElement);

        // Append the <a> element to the <div>
        divElement.appendChild(pElement);
        divElement.appendChild(aElement);

        // Append the <div> element to the image container
        imageContainer.appendChild(aElement);

    }

}
populateCarouselContainer()
populateCarouselContainer_old()


class Carousel {
    /** 
     * @param (HTMLElement) element
     * @param (Objet) options
    */
    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({ slideToScroll: 7, slideVisible: 3 }, options)
        this.children = [].slice.call(element.children)
        this.currentItem = 0
        let ratio = this.children.length / this.options.slideVisible
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel-container')
        this.container.style.width = (ratio * 100) + "%"
        this.container.style.marginLeft = "35px"
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        debugger;
        this.children.forEach((child) => {
            let div = this.createDivWithClass('carousel-item');
            div.style.width = ((100 / this.options.slideVisible) / ratio) + "%"
            div.appendChild(child);
            this.container.appendChild(div);
        })
        this.createNavigation()
    }


    scrollToNextSlide() {
        this.currentItem++;
        this.scrollToCurrentSlide();
    }

    // Scroll to the previous slide
    scrollToPrevSlide() {
        this.currentItem--;
        if (this.currentItem < 0) {
            this.currentItem = 0;
        }
        this.scrollToCurrentSlide();
    }

    // Scroll to the current slide
    scrollToCurrentSlide() {
        let translateX = this.currentItem * (-100 / this.children.length)
        this.container.style.transform = `translateX(${translateX}%)`;
    }


    createNavigation() {
        let nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.className = "carousel-next";
        this.root.appendChild(nextButton);
        nextButton.style.width = '72px';
        nextButton.style.height = '35px';

        let prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.className = "carousel-prev";
        this.root.appendChild(prevButton);
        prevButton.style.width = '72px';
        prevButton.style.height = '35px';

        prevButton.addEventListener("click", () => this.scrollToPrevSlide());
        nextButton.addEventListener("click", () => this.scrollToNextSlide());

    }

    createDivWithClass(className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}



document.addEventListener("DOMContentLoaded", function () {
    new Carousel(document.querySelector('#best-fantasy'), {
        slideToScroll: 7,
        slideVisible: 4
    })

    new Carousel(document.querySelector('#best-movies'), {
        slideToScroll: 7,
        slideVisible: 4
    })

})