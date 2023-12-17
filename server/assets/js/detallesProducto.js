const imagesAside = document.querySelector(".img-aside")
const mainImage = document.querySelector(".container-img > img")

imagesAside.addEventListener("mouseover", (e) => {
    if (!e.target.classList.contains("selected-image") && e.target.tagName === "IMG") {
        document.querySelector(".selected-image").classList.remove("selected-image")
        e.target.classList.add("selected-image")

        mainImage.src = e.target.src
    }
})

// //       ----------
// // --- -- Carrusel -- ---
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

// slide mobile

const slider = document.querySelector(".slider")
const items = document.querySelectorAll(".item")

slider.addEventListener("scroll", prueba)

function prueba () {
    if (slider.scrollLeft < slider.clientWidth) {
        formatSelectedClass(items[0])
    } else if (slider.scrollLeft < slider.clientWidth * 2) {
        formatSelectedClass(items[1])
    } else if (slider.scrollLeft < slider.clientWidth * 3) {
        formatSelectedClass(items[2])
    } else if (slider.scrollLeft < slider.clientWidth * 4) {
        formatSelectedClass(items[3])
    } else if (slider.scrollLeft < slider.clientWidth * 5) {
        formatSelectedClass(items[4])
    }
}

function formatSelectedClass (item) {
    for (const item of items) {
        item.classList.remove("selected")
    }
    item.classList.add("selected")
}
