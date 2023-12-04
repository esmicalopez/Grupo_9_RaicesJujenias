// IMAGEN DEL INPUT
const fileInput = document.querySelector("#product-image")
const imgList = document.querySelector(".show-images-edit")
const showImagesContainer = document.querySelector(".show-images-container")

fileInput.addEventListener("change", (e) => {
    toggleErrorImage({ input: e.target })
})

function toggleErrorImage ({ input }) {
    const imageValidationResults = imageValidator(input)

    const divError = input.parentNode.parentNode.children[0]
    if (!imageValidationResults) {
        input.value = ""
        divError.classList.remove("none")
        fileInput.parentNode.parentNode.children[2].classList.add("border-error")
        showImagesContainer.classList.add("none")
        console.log("--verdaddero")

        divError.firstElementChild.innerText = "Imagenes permitidas: JPG, JPEG, PNG, GIF"
    } else {
        console.log("--falso")
        fileInput.parentNode.parentNode.children[2].classList.remove("border-error")
        divError.classList.add("none")
        displaySelectedImages()
    }
}

function displaySelectedImages () {
    showImagesContainer.classList.remove("none")

    const images = document.querySelectorAll(".img-edit")
    const figures = document.querySelectorAll(".show-list-images")

    Array.from(fileInput.files).forEach((img, i) => {
        images[i].src = URL.createObjectURL(img)
        figures[i].setAttribute("data-id", img.name)
        figures[i].classList.add("item")
    })
    dragImages()
}

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

function showBoxError ({ input, msg }) {
    input.classList.add("border-error")

    const divError = input.parentNode.children[0]
    divError.classList.remove("none")
    divError.firstElementChild.innerText = msg
}

function hideBoxError ({ input }) {
    input.classList.remove("border-error")

    const divError = input.parentNode.children[0]
    divError.classList.add("none")
}

function isEmpty (input) {
    input.addEventListener("blur", (e) => {
        if (e.target.value.trim() === "") {
            showBoxError({ input: e.target, msg: "El campo no puede estar Vacio." })
        }
    })
}

function minimumCharacters ({ inputName, minLength }) {
    document.querySelector(`#${inputName}`).addEventListener("change", (e) => {
        if (e.target.value.length < minLength) {
            showBoxError({ input: e.target, msg: `Debe tener como mínimo ${minLength} caracteres.` })
        } else {
            hideBoxError({ input: e.target })
        }
    })
}

function validateInput ({ inputName, minLength }) {
    document.querySelector(`#${inputName}`).addEventListener("input", (e) => {
        if (e.target.value === " ") {
            showBoxError({ input: e.target, msg: "El campo no puede estar vacio." })
            e.target.value = e.target.value.replace(/^\s*/g, "")
        } else if (e.target.value.length < minLength) {
            showBoxError({ input: e.target, msg: `Debe tener como mínimo ${minLength} caracteres.` })
        } else {
            hideBoxError({ input: e.target })
        }
    })
}

function validateInputNumber (input, value) {
    const msg = value === 0 ? "Valores mayores a 0." : `El precio debe ser mayor a $${value}.`
    input.addEventListener("input", (e) => {
        if (e.target.value <= value) {
            showBoxError({ input: e.target, msg })
        } else {
            hideBoxError({ input: e.target })
        }
    })
}

function imageValidator (input) {
    let error = true
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"]
    Array.from(input.files).forEach(file => {
        const fileExtension = file.name.split(".").pop().toLowerCase()

        if (!allowedExtensions.includes(fileExtension)) {
            error = allowedExtensions.includes(fileExtension)
        }
    })
    return error
}

function validateSelectedValue (input) {
    input.addEventListener("change", (e) => {
        if (e.target.value !== "") {
            hideBoxError({ input: e.target })
        }
    })
}

function errorsInputs () {
    let error = false
    const inputs = document.querySelectorAll(".input")
    for (const input of inputs) {
        if (input.value === "") {
            error = true
            showBoxError({ input, msg: "El campo no puede estar Vacio." })
        }
    }
    return error
}

//  -- FORMULARIO --

const form = document.querySelector(".form-container")
const actionURL = form.action

form.addEventListener("submit", (e) => {
    let imageDivHasError = false
    if (fileInput.value === "") {
        imageDivHasError = true
        fileInput.parentNode.parentNode.children[2].classList.add("border-error")
        const imageDivError = fileInput.parentNode.parentNode.children[0]
        imageDivError.classList.remove("none")
        imageDivError.firstElementChild.innerText = "Subir por lo menos 1 imagen."
    }

    const hasErrors = errorsInputs()

    if (hasErrors || imageDivHasError) e.preventDefault()
})

//

isEmpty(document.querySelector("#name"))
validateInput({ inputName: "name", minLength: 5 })
minimumCharacters({ inputName: "name", minLength: 5 })

isEmpty(document.querySelector("#description"))
validateInput({ inputName: "description", minLength: 20 })
minimumCharacters({ inputName: "description", minLength: 20 })

validateInputNumber(document.querySelector("#price"), 20)
isEmpty(document.querySelector("#price"))

validateInputNumber(document.querySelector("#stock"), 0)
isEmpty(document.querySelector("#stock"))

isEmpty(document.querySelector("#color"))
validateSelectedValue(document.querySelector("#color"))

isEmpty(document.querySelector("#size"))
validateSelectedValue(document.querySelector("#size"))

isEmpty(document.querySelector("#category"))
validateSelectedValue(document.querySelector("#category"))
