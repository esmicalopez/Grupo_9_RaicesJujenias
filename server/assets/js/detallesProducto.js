const imagesAside = document.querySelector(".img-aside")
const mainImage = document.querySelector(".container-img > img")

imagesAside.addEventListener("mouseover", (e) => {
    if (!e.target.classList.contains("selected-image") && e.target.tagName === "IMG") {
        document.querySelector(".selected-image").classList.remove("selected-image")
        e.target.classList.add("selected-image")

        mainImage.src = e.target.src
    }
})
