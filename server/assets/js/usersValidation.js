window.addEventListener("load", function () {
    const expresiones = {
        name: /^[a-zA-Z0-9]{2,18}$/,
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        password: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,100}$/
    }

    // Vista previa de avatar

    const image = document.querySelector("#profile-picture")
    const imgPreview = document.querySelector("#imgPreview")

    image.addEventListener("change", function (e) {
        const [file] = image.files
        if (file) {
            const avatarPreview = document.querySelector(".avatar-setting")
            const deletePreview = document.querySelector(".del-avatar-preview")
            avatarPreview.classList.remove("avatar-preview-none")
            avatarPreview.classList.add("avatar-preview")
            imgPreview.src = URL.createObjectURL(file)

            deletePreview.onclick = () => {
                avatarPreview.classList.remove("avatar-preview")
                avatarPreview.classList.add("avatar-preview-none")
                image.value = ""
                imgPreview.src = ""
            }
        }
    })

    // Validaciones
    const formulario = document.querySelector(".form-container")
    const inputName = document.querySelector(".form-container input#name")
    const inputLastName = document.querySelector(".form-container input#last-name")
    const inputEmail = document.querySelector(".form-container input#email")
    const inputPassword = document.querySelector(".form-container input#password")
    const inputRepeatPassword = document.querySelector(".form-container input#repeat-password")
    const inputRol = document.querySelectorAll(".form-container .input-radio input")
    const inputTerms = document.querySelector(".form-container input#terminos")

    const inputs = [inputName, inputLastName, inputEmail, inputPassword, inputRepeatPassword]

    const passwordCompare = () => {
        if (inputPassword.value === inputRepeatPassword.value && campos.password) {
            inputRepeatPassword.classList.remove("isIncorrect")
            inputRepeatPassword.classList.add("isCorrect")
            document.querySelector("small.comparePassword").classList.add("display")
            campos.confirmPassword = true
        } else {
            inputRepeatPassword.classList.remove("isCorrect")
            inputRepeatPassword.classList.add("isIncorrect")
            document.querySelector("small.comparePassword").classList.remove("display")
            campos.confirmPassword = false
        }
    }

    const campos = {
        name: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false
    }

    const validation = (input, expresion, small, campo) => {
        if (expresion.test(input.value)) {
            input.classList.remove("isIncorrect")
            input.classList.add("isCorrect")
            document.querySelector(`small.${small}`).classList.add("display")

            campos[campo] = true
        } else {
            input.classList.remove("isCorrect")
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

        if (e.target.name === "password") {
            validation(inputPassword, expresiones.password, "passwordValidations", "password")
            passwordCompare()
        }

        if (e.target.name === "confirmPassword") {
            validation(inputRepeatPassword, expresiones.password, "passwordRepeatValidations", "confirmPassword")
            passwordCompare()
        }
    }

    inputs.forEach(input => {
        input.addEventListener("keyup", inputsValidation)
        input.addEventListener("blur", inputsValidation)
    })

    formulario.addEventListener("submit", function (e) {
        const { name, lastName, email, password, confirmPassword } = campos
        if (!name || !lastName || !email || !password || !confirmPassword) {
            alert("Porfavor complete correctamente el formulario")
            e.preventDefault()
        }

        if (!inputTerms.checked) {
            document.querySelector("small.termsValidations").classList.remove("display")
            e.preventDefault()
        }

        let rolChecked
        inputRol.forEach(rol => {
            if (rol.checked) {
                rolChecked = true
            }
        })
        if (!rolChecked) {
            e.preventDefault()
            document.querySelector("small.rolValidations").classList.remove("display")
        } else {
            document.querySelector("small.rolValidations").classList.add("display")
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
