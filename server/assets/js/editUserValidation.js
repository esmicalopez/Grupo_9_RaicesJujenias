window.addEventListener("load", function () {
    const expresiones = {
        name: /^[a-zA-Z0-9]{2,18}$/,
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    }

    // Vista previa de avatar

    const image = document.querySelector("#avatar")
    const imgPreview = document.querySelector("#imgPreview")

    image.addEventListener("change", function (e) {
        const [file] = image.files
        if (file) {
            const newAvatarLabel = document.querySelector(".profile-avatar h5")
            imgPreview.style.display = "block"
            newAvatarLabel.style.display = "block"
            imgPreview.src = URL.createObjectURL(file)
        }
    })

    // Validaciones
    const formulario = document.querySelector(".profile-info")

    const inputName = document.querySelector(".profile-info input#name")
    const inputLastName = document.querySelector(".profile-info input#lastName")
    const inputEmail = document.querySelector(".profile-info input#email")

    const inputs = [inputName, inputLastName, inputEmail]

    const campos = {
        name: false,
        lastName: false,
        email: false
    }

    const validation = (input, expresion, small, campo) => {
        if (expresion.test(input.value)) {
            input.classList.remove("isIncorrect")
            document.querySelector(`small.${small}`).classList.add("display")
            campos[campo] = true
        } else {
            input.classList.add("isIncorrect")
            document.querySelector(`small.${small}`).classList.remove("display")
            campos[campo] = false
        }
    }

    const inputsValidation = function (e) {
        if (e.target.name === "name") {
            validation(inputName, expresiones.name, "nameValidations", "name")
        }

        if (e.target.name === "lastName") {
            validation(inputLastName, expresiones.name, "lastNameValidations", "lastName")
        }

        if (e.target.name === "email") {
            validation(inputEmail, expresiones.email, "emailValidations", "email")
        }
    }

    inputs.forEach(input => {
        input.addEventListener("keyup", inputsValidation)
        input.addEventListener("blur", inputsValidation)
    })

    formulario.addEventListener("submit", function (e) {
        const { name, lastName, email } = campos
        if (!name || !lastName || !email) {
            alert("Los datos a editar son incorrectos")
            e.preventDefault()
        }

        const [file] = image.files
        if (file) {
            const allowedExtensions = ["jpg", "jpeg", "png"]
            const fileExtension = image.files[0].name.split(".").pop().toLowerCase()
            if (!allowedExtensions.includes(fileExtension)) {
                alert("La extension de la imagen debe ser: JPG, JPEG, PNG")
                e.preventDefault()
            }
        }
    })
})
