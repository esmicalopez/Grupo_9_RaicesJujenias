// IMAGEN DEL INPUT

const showImagesContainer = document.querySelector(".show-images-container")
const imgList = document.querySelector(".show-images-edit")
const fileInput = document.querySelector("#product-image")

const messages = {
    uploadImage: "* Subir por lo menos 1 imagen.",
    allowedImages: "* Imágenes permitidas: JPG, JPEG, PNG, GIF.",
    fieldNotEmpty: "* El campo no puede estar Vacío.",
    valuesGreaterThanZero: "Valores mayores a 0.",
    noNegativeValues: "* No se permiten valores negativos.",
    priceGreaterThan: (value) => `* El precio debe ser mayor a $${value}.`,
    minLengthErrorMessage: (minLength) => `* Debe tener como mínimo ${minLength} caracteres.`,
    fieldSelectNotEmpty: (value) => `* Seleccione ${value}.`
}

const errors = []

fileInput.addEventListener("change", (e) => {
    if (e.target.files.length === 0) {
        showImagesContainer.classList.add("none")
        return
    }

    const imageValidationResults = imageValidator(e.target)

    const divError = document.querySelector(".product-photo > .error-photo")
    // const divError = e.target.parentNode.parentNode.parentNode.children[0]

    if (!imageValidationResults) {
        e.target.value = ""
        divError.classList.remove("none")
        divError.firstElementChild.innerText = messages.allowedImages
        showImagesContainer.classList.add("none")
    } else {
        divError.classList.add("none")
        displaySelectedImages()
    }
})

function displaySelectedImages () {
    showImagesContainer.classList.remove("none")

    const images = document.querySelectorAll(".img-edit")
    const figures = document.querySelectorAll(".show-list-images")

    Array.from(fileInput.files).forEach((img, i) => {
        images[i].src = URL.createObjectURL(img)
        figures[i].setAttribute("data-id", img.name)
    })

    for (let i = fileInput.files.length; i < figures.length; i++) {
        figures[i].setAttribute("data-id", "false")
    }

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
                form.action = actionURL + "&newList=" + JSON.stringify(order)
            }
        }
    })
}

// --- Manejo de Errores ---

function handleInputValidation ({ input, msg }) {
    showBoxError({ input, msg })
    const fieldName = input.getAttribute("name")

    const existingErrorIndex = errors.findIndex(error => error.inputName === fieldName)

    if (existingErrorIndex !== -1) {
        errors[existingErrorIndex].msg = msg
    } else {
        errors.push({ inputName: fieldName, msg, position: input.getAttribute("data-position") })
        errors.sort((a, b) => a.position - b.position)
    }
}

function showBoxError ({ input, msg }) {
    input.classList.add("border-error")

    const divError = document.querySelector(`.${input.parentNode.classList[0]} > .error `)
    divError.classList.remove("none")
    divError.firstElementChild.innerText = msg
}

function removeValidationError ({ input }) {
    hideBoxError({ input })
    const fieldName = input.getAttribute("name")
    const indexToRemove = errors.findIndex(error => error.inputName === fieldName)

    if (indexToRemove !== -1) {
        errors.splice(indexToRemove, 1)
    }
}

function hideBoxError ({ input }) {
    input.classList.remove("border-error")

    const divError = document.querySelector(`.${input.parentNode.classList[0]} > .error `)
    divError.classList.add("none")
}

//        ------
// --- VALIDACIONES ---

function notEmpty (input) {
    input.addEventListener("blur", (e) => {
        if (e.target.value.trim() === "") {
            handleInputValidation({ input: e.target, msg: messages.fieldNotEmpty })
        }
    })
}

function minimumCharacters ({ inputName, minLength }) {
    document.querySelector(`#${inputName}`).addEventListener("change", (e) => {
        if (e.target.value.length < minLength) {
            handleInputValidation({ input: e.target, msg: messages.minLengthErrorMessage(minLength) })
        } else {
            removeValidationError({ input: e.target })
        }
    })
}

function validateInputText ({ inputName, minLength }) {
    document.querySelector(`#${inputName}`).addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/^\s*/g, "")
        if (e.target.value === "") {
            handleInputValidation({ input: e.target, msg: messages.fieldNotEmpty })
        } else if (e.target.value.length < minLength) {
            handleInputValidation({ input: e.target, msg: messages.minLengthErrorMessage(minLength) })
        } else {
            removeValidationError({ input: e.target })
        }
    })
}

function validateInputNumber (input, value) {
    const msg = value === 0 ? messages.valuesGreaterThanZero : messages.priceGreaterThan(value)
    input.addEventListener("input", (e) => {
        if (e.target.value === "") {
            handleInputValidation({ input: e.target, msg: messages.fieldNotEmpty })
        } else if (e.target.value <= value) {
            handleInputValidation({ input: e.target, msg })
        } else {
            removeValidationError({ input: e.target })
        }
    })
}

function validateInputOffer (input) {
    input.addEventListener("input", (e) => {
        if (e.target.value < 0 || e.target.value === "-0") {
            handleInputValidation({ input: e.target, msg: messages.noNegativeValues })
        } else {
            removeValidationError({ input: e.target })
        }
    })
}

function validateSelectedValue (input) {
    input.addEventListener("change", (e) => {
        if (e.target.value !== "") {
            removeValidationError({ input: e.target })
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

//  -- FORMULARIO --

const form = document.querySelector(".form-container")
const actionURL = form.action

form.addEventListener("submit", (e) => {
    if (!errors.length > 0) {
        console.log("No hay errores")
        return
    }
    e.preventDefault()

    const input = e.target.elements[errors[0].inputName]

    input.scrollIntoView({ behavior: "smooth", block: "center" })
    input.focus()

    showBoxError({ input, msg: errors[0].msg })
})

//

notEmpty(document.querySelector("#name"))
validateInputText({ inputName: "name", minLength: 5 })
minimumCharacters({ inputName: "name", minLength: 5 })

notEmpty(document.querySelector("#description"))
validateInputText({ inputName: "description", minLength: 20 })
minimumCharacters({ inputName: "description", minLength: 20 })

validateInputNumber(document.querySelector("#price"), 20)
notEmpty(document.querySelector("#price"))

validateInputNumber(document.querySelector("#stock"), 0)
notEmpty(document.querySelector("#stock"))

validateInputOffer(document.querySelector("#offer"))

notEmpty(document.querySelector("#color"))
validateSelectedValue(document.querySelector("#color"))

notEmpty(document.querySelector("#size"))
validateSelectedValue(document.querySelector("#size"))

notEmpty(document.querySelector("#category"))
validateSelectedValue(document.querySelector("#category"))
