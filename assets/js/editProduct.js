// IMAGEN DEL INPUT

const fileInput = document.querySelector("#profile-picture")
const imgList = document.querySelector(".show-images-edit")

fileInput.addEventListener("change", function (evt) {
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
        // chosenClass: "transform",

        setData: function (dataTransfer, dragEl) {
            console.log(dataTransfer)
            console.log(dragEl.children[1])

            dataTransfer.setData("Text", dragEl.children[1].textContent) // `dataTransfer` object of HTML5 DragEvent
        }
    })
}

//  -- FORMULARIO --

const form = document.querySelector(".form-container")

form.addEventListener("submit", e => {
    e.preventDefault()

    const input = document.querySelector("#profile-picture")
    const inputArray = Array.from(input.files)
    const newArrayFiles = []

    const figures = Array.from(document.querySelectorAll(".show-list-images"))

    // const dataAtribbuteArray = figures.map((e) => e.getAttribute("data-id") != undefined ?  e.getAttribute("data-id") : )

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

    const actionURL = e.target.action // Obtén la URL del atributo action

    const formData = new FormData(e.target)
    // console.log(formData)
    formData.delete("product-image")

    newArrayFiles.forEach((file, index) => {
        formData.append("product-image", file)
    })

    // fetch(actionURL, {
    //     method: "PUT",
    //     body: formData
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //     })
    //     .catch(error => {
    //         console.error("Error:", error)
    //     })
})
