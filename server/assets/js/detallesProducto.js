const imagesAside = document.querySelector(".img-aside")
const mainImage = document.querySelector(".container-img > img")

imagesAside.addEventListener("mouseover", (e) => {
    if (!e.target.classList.contains("selected-image") && e.target.tagName === "IMG") {
        document.querySelector(".selected-image").classList.remove("selected-image")
        e.target.classList.add("selected-image")

        mainImage.src = e.target.src
    }
})

//       ----------
// --- -- Carrusel -- ---
const carruselWrapper = document.querySelector(".carousel-wrapper")
const leftButton = document.querySelector(".control-left")
const rightButton = document.querySelector(".control-right")

const quantityProducts = carruselWrapper.getAttribute("data-product-length")
const distance = 100 / (quantityProducts / 4)
let counter = 1

rightButton.addEventListener("click", () => {
    const translate = distance * (counter)
    carruselWrapper.style.transform = `translateX(-${translate}%)`
    counter++

    if (counter === Math.ceil(quantityProducts / 4)) {
        rightButton.classList.add("hidden")
    }

    if (counter !== 1) {
        leftButton.classList.remove("hidden")
    }
})

leftButton.addEventListener("click", () => {
    const translate = distance * (counter - 1) * (-1) + distance
    carruselWrapper.style.transform = `translateX(${translate}%)`
    counter--

    if (counter === 1) {
        leftButton.classList.add("hidden")
    }

    if (counter < Math.ceil(quantityProducts / 4)) {
        rightButton.classList.remove("hidden")
    }
})
