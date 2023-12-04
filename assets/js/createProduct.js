// IMAGEN DEL INPUT

const fileInput = document.querySelector("#product-image")
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
        chosenClass: "selected",
        group: "list-products",
        store: {
            set: (sortable) => {
                const order = sortable.toArray()
                form.action = actionURL + "?newList=" + JSON.stringify(order)
            }
        }
    })
}

//  -- FORMULARIO --

const form = document.querySelector(".form-container")
const actionURL = form.action
