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

slider.addEventListener("scroll", sliderMobile)

function sliderMobile () {
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

const carouselWrapper = document.querySelector(".carousel-wrapper")
const productItem = document.querySelectorAll(".product-item")
const widthCarousel = productItem.length / 4 * 100

window.addEventListener("scroll", function (event) {
    if (window.innerWidth >= 1200) {
        carouselWrapper.style.width = `${widthCarousel}%`
    }
})

// Button Add To Cart
const buttonAddCart = document.querySelector(".btn-add-to-cart")

buttonAddCart.addEventListener("click", () => {
    const imgProduct = document.querySelector(".img-aside > img")
    const productName = document.querySelector(".container-name-product")
    const productPrice = document.querySelector(".product-price-cart")
    const productDescription = document.querySelector(".text-additional-information > p")
    const productId = imgProduct.getAttribute("data-product-id")
    // const productOffer = document.querySelector(".product-old-price-cart")
    // offer: productOffer.innerText,

    const productsArray = []

    const product = {
        name: productName.innerText,
        image: imgProduct.src,
        price: productPrice.innerText,
        description: productDescription.textContent,
        id: productId,
        amount: 1

    }

    productsArray.push(product)

    if (!window.localStorage.getItem("products")) {
        window.localStorage.setItem("products", JSON.stringify(productsArray))
        return
    }

    const productList = JSON.parse(window.localStorage.getItem("products"))

    const existingProductIndex = productList.findIndex(p => p.id === product.id)

    if (existingProductIndex !== -1) {
        productList[existingProductIndex].amount += 1
    } else {
        productList.push(product)
        window.localStorage.setItem("products", JSON.stringify(productList))
    }
})
