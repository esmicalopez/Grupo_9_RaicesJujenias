// IMAGEN DEL INPUT
const fileInput = document.querySelector("#product-image")
const imgList = document.querySelector(".show-images-edit")
const showImagesContainer = document.querySelector(".show-images-container")

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
        handleInputFileValidation({ input: e.target, msg: messages.uploadImage })
        return
    }
    toggleErrorImage({ input: e.target })
})

function toggleErrorImage ({ input }) {
    const imageValidationResults = imageValidator(input)
    if (!imageValidationResults) {
        handleInputFileValidation({ input, msg: messages.allowedImages })

        showImagesContainer.classList.add("none")
    } else {
        removeValidationFileError({ input })
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

//          -------
// --- Manejo de Errores ---

function handleInputFileValidation ({ input, msg }) {
    showImageBoxError({ input, msg })
    input.value = ""

    const fieldName = input.getAttribute("name")

    const existingErrorIndex = errors.findIndex(error => error.inputName === fieldName)

    if (existingErrorIndex !== -1) {
        errors[existingErrorIndex].msg = msg
    } else {
        errors.push({ inputName: fieldName, msg, position: input.getAttribute("data-position") })
        errors.sort((a, b) => a.position - b.position)
    }
    showImagesContainer.classList.add("none") // quizas poner al de arriba "showImageBoxError"
}

function showImageBoxError ({ input, msg }) {
    const divError = document.querySelector(`.${fileInput.parentNode.parentNode.classList[0]} > .error`)
    divError.classList.remove("none")
    divError.firstElementChild.innerText = msg
    document.querySelector(".input-photo-box").classList.add("border-error")
}

function removeValidationFileError ({ input }) {
    hideImageBoxError({ input })
    const fieldName = input.getAttribute("name")
    const indexToRemove = errors.findIndex(error => error.inputName === fieldName)

    if (indexToRemove !== -1) {
        errors.splice(indexToRemove, 1)
    }
}

function hideImageBoxError ({ input }) {
    const divError = document.querySelector(".product-photo > .error")
    divError.classList.add("none")
    document.querySelector(".input-photo-box").classList.remove("border-error")

    displaySelectedImages()
}

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
            if (e.target.getAttribute("data-name")) {
                handleInputValidation({ input: e.target, msg: messages.fieldSelectNotEmpty(e.target.getAttribute("data-name")) })
            } else {
                handleInputValidation({ input: e.target, msg: messages.fieldNotEmpty })
            }
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

// ----- ------ -----

(
    function setInitialErrorsForInputs () {
        const inputs = document.querySelectorAll(".input")
        for (const input of inputs) {
            if (input.value !== "") continue

            const fieldName = input.getAttribute("name")
            if (fieldName === "product-image") {
                errors.push({ inputName: fieldName, msg: messages.uploadImage, position: input.getAttribute("data-position") })
                continue
            }

            if (input.getAttribute("data-name")) {
                errors.push({ inputName: fieldName, msg: messages.fieldSelectNotEmpty(input.getAttribute("data-name")), position: input.getAttribute("data-position") })
                continue
            }

            errors.push({ inputName: fieldName, msg: messages.fieldNotEmpty, position: input.getAttribute("data-position") })
        }
    }
)()

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

    if (errors[0].inputName === fileInput.getAttribute("name")) {
        showImageBoxError({ input, msg: errors[0].msg })
    } else {
        showBoxError({ input, msg: errors[0].msg })
    }

    // for (const error of errors) {
    // if (error.inputName === fileInput.getAttribute("name")) {
    //     showImageBoxError({ input: e.target.elements[error.inputName], msg: error.msg })
    //     continue
    // }

    //     const input = e.target.elements[error.inputName]
    //     showBoxError({ input, msg: error.msg })
    // }
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
