// IMAGEN DEL INPUT

const fileInput = document.querySelector("#profile-picture")
const imgList = document.querySelector(".show-images-edit")
const showImagesContainer = document.querySelector(".show-images-container")

fileInput.addEventListener("change", () => {
    showImagesContainer.classList.remove("none")

    const images = document.querySelectorAll(".img-edit")
    const figures = document.querySelectorAll(".show-list-images")

    Array.from(fileInput.files).forEach((img, i) => {
        images[i].src = URL.createObjectURL(img)
        figures[i].setAttribute("data-id", img.name)
        figures[i].classList.add("item")
    })

    dragImages()
})

function dragImages () {
    Sortable.create(imgList, {
        animation: 150,
        draggable: ".item",
        chosenClass: "selected"
    })
}

//  -- FORMULARIO --

const form = document.querySelector(".form-container")

form.addEventListener("submit", e => {
    e.preventDefault()
    console.log(fileInput.files)
    const input = document.querySelector("#profile-picture")
    console.log(input.files)

    const inputArray = Array.from(input.files)
    const newArrayFiles = []

    const figures = Array.from(document.querySelectorAll(".show-list-images"))

    console.log(inputArray.length)
    for (let i = 0; i < inputArray.length; i++) {
        console.log(figures[i].getAttribute("data-id"))
        // console.log(inputArray)

        for (const image of inputArray) {
            if (figures[i].getAttribute("data-id") === image.name) {
                console.warn(image.name)
                newArrayFiles.push(image)
                break
            } else {
                console.log("false")
                console.log(image.name)
            }
        }
    }

    // console.log(newArrayFiles)
    // console.log(input.files)

    const actionURL = e.target.action

    const formData = new FormData(e.target)
    formData.delete("product-image")

    newArrayFiles.forEach((file, index) => {
        formData.append("product-image", file)
    })

    fetch(actionURL, {
        method: "PUT",
        body: formData
    })
        .then(response => response.json())
        .catch(error => {
            console.error("Error:", error)
        })

    setTimeout(() => {
        window.location.href = "/productos"
    }, 300)
})
