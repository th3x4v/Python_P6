const urlsBestDrama = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre_contains=drama&page_size=15"
const urlsBestMovies = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=15"
const urlsBestScifi = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre_contains=sci-fi&page_size=15"
const urlsBestFantasy = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre_contains=fantasy&page_size=15"


async function getData(url) {
    const response = await fetch(url);
    console.log('response:>> ', response);
    if (!response.ok) {
        throw console.log("Une erreur est survenue lors de la requete. Code erreur:" +
            response.status
        );
    }
    const jsonData = await response.json();
    return jsonData
}
async function getMovies(url) {
    const jsonData = await getData(url)
    let data = jsonData.results
    data = data.slice(0, 7);
    return data
}



class Carousel {
    /** 
     * @param (HTMLElement) element
     * @param (Objet) options
    */
    constructor(movies, imageContainer, options = {}) {
        this.movies = movies
        this.element = imageContainer
        this.options = Object.assign({ slideToScroll: 7, slideVisible: 3 }, options)
        this.container = this.createDivWithClass('carousel-container')
        this.children = [];
        this.currentItem = 0
        let ratio = this.movies.length / this.options.slideVisible
        this.root = this.createDivWithClass('carousel')
        this.container.style.width = (ratio * 100) + "%"
        this.container.style.marginLeft = "35px"
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)

        this.createCarouselStructure()
        this.createNavigation()
    }

    createCarouselStructure() {
        this.movies.forEach((movie) => {
            const { title, image_url } = movie;

            const divElement = this.createDivWithClass("carousel-item")

            const pElement = document.createElement("p");
            pElement.textContent = title;

            const imgElement = document.createElement("img");
            imgElement.src = image_url;
            imgElement.alt = "Image";

            divElement.appendChild(pElement);
            divElement.appendChild(imgElement);
            debugger;
            this.container.appendChild(divElement);
            this.children.push(divElement);
        });
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


async function createCarousel(url, categorie) {
    let movies = await getMovies(url);
    let imageContainer = document.getElementById(categorie);
    new Carousel(movies, imageContainer, {
        slideToScroll: 7,
        slideVisible: 4
    });
}

createCarousel(urlsBestDrama, "best-drama");
createCarousel(urlsBestMovies, "best-movies");
createCarousel(urlsBestScifi, "best-scifi");
createCarousel(urlsBestFantasy, "best-fantasy");




//new Carousel(document.querySelector('#best-fantasy'), {
//    slideToScroll: 7,
 //   slideVisible: 4
//})



