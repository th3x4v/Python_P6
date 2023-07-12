const urlsBestDrama = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre_contains=drama&page_size=15"
const urlsBestMovies = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=15"
const urlsBestScifi = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre_contains=sci-fi&page_size=15"
const urlsBestFantasy = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre_contains=fantasy&page_size=15"


/* The `getData` function is an asynchronous function that fetches data from a specified URL. It uses
the `fetch` function to make a GET request to the URL and waits for the response using the `await`
keyword. */
async function getData(url) {
    const response = await fetch(url);
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

async function getMovie(url) {
    const jsonData = await getData(url)
    return jsonData
}

function openModal(movie) {
    const modalContainer = document.getElementById("modalContainer");
    const closeModalButton = document.getElementsByClassName("close")[0];
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalDescription = document.getElementById("modalDescription");
    const modalGenre = document.getElementById("modalGenre");
    const modalReleaseDate = document.getElementById("modalReleaseDate");
    const modalRated = document.getElementById("modalRated");
    const modalImdbScore = document.getElementById("modalImdbScore");
    const modalDirector = document.getElementById("modalDirector");
    const modalActors = document.getElementById("modalActors");
    const modalDuration = document.getElementById("modalDuration");
    const modalCountry = document.getElementById("modalCountry");
    const modalBoxOffice = document.getElementById("modalBoxOffice");

    // Function to open the modal and populate it with movie information

    modalTitle.textContent = movie.original_title;
    modalImage.src = movie.image_url;
    modalDescription.textContent = movie.description;
    modalGenre.textContent = movie.genres.join(", ");
    modalReleaseDate.textContent = movie.date_published;
    modalRated.textContent = movie.rated;
    modalImdbScore.textContent = movie.imdb_score;
    modalDirector.textContent = movie.directors.join(", ");
    modalActors.textContent = movie.actors.join(", ");
    modalDuration.textContent = movie.duration;
    modalCountry.textContent = movie.countries.join(", ");
    modalBoxOffice.textContent = movie.worldwide_gross_income + "$";
    modalContainer.style.display = "block";

    // Event listener to close the modal when the close button is clicked
    closeModalButton.addEventListener("click", function () {
        modalContainer.style.display = "none";
    });

    // Event listener to close the modal when the user clicks outside the modal
    window.addEventListener("click", function (event) {
        if (event.target == modalContainer) {
            modalContainer.style.display = "none";
        }
    });
}

async function createBestMovies() {
    let movie = await getMovies(urlsBestMovies)
    let movie_ = movie[0];
    let dataMovie = await getMovie(movie_.url)
    let container = document.getElementById("best-movie");

    const pElement = document.createElement("p");
    pElement.textContent = dataMovie.original_title;

    const imgElement = document.createElement("img");
    imgElement.src = dataMovie.image_url;
    imgElement.alt = "Image";
    imgElement.style.width = '273px';
    imgElement.style.height = '402px';


    const openModalButton = document.createElement("button");
    openModalButton.id = "openModal";
    openModalButton.textContent = "MORE";

    container.appendChild(pElement);
    container.appendChild(imgElement);
    container.appendChild(openModalButton);

    // Event listener to open the modal when the button is clicked
    openModalButton.addEventListener("click", function () {
        openModal(dataMovie);
    });
}

class Carousel {
    /** 
     * @param (HTMLElement) element
     * @param (Objet) options
    */
    constructor(movies, imageContainer) {
        this.movies = movies
        this.element = imageContainer
        this.container = this.createDivWithClass('carousel-container')
        this.children = [];
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container.style.width = "2000px"
        this.container.style.marginLeft = "72px"
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)

        this.createCarouselStructure()
        this.createNavigation()
    }

    createCarouselStructure() {
        this.movies.forEach(async (movie) => {
            const { title, image_url } = movie;

            const divElement = this.createDivWithClass("carousel-item")

            const pElement = document.createElement("p");
            pElement.textContent = title;
            pElement.style.width = '182px';

            const imgElement = document.createElement("img");
            imgElement.src = image_url;
            imgElement.alt = "Image";
            imgElement.style.width = '182px';
            imgElement.style.height = '268px';

            divElement.appendChild(pElement);
            divElement.appendChild(imgElement);
            this.container.appendChild(divElement);
            this.children.push(divElement);

            const dataMovie = await getMovie(movie.url);
            imgElement.addEventListener("click", () => {
                openModal(dataMovie);
            });
        });
    }

    scrollToNextSlide() {
        this.currentItem++;
        if (this.currentItem > 2) {
            this.currentItem = 3;
        }
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
        let translateX = this.currentItem * (-254)
        //(-100 / this.children.length)
        this.container.style.transform = `translateX(${translateX}px)`;
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


createBestMovies()
createCarousel(urlsBestMovies, "best-movies");
createCarousel(urlsBestDrama, "best-drama");
createCarousel(urlsBestScifi, "best-scifi");
createCarousel(urlsBestFantasy, "best-fantasy");

