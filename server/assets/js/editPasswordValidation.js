window.addEventListener("load", function () {
    const expresiones = {
        password: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,100}$/,
        oldPassword: /^[a-zA-Z0-9!@#$&*]{4,100}$/
    }

    // Validaciones
    const formPassword = document.querySelector("#formPassword")

    const inputOldPassword = document.querySelector("input#oldPassword")
    const inputPassword = document.querySelector("input#password")
    const inputRepeatPassword = document.querySelector("input#confirmPassword")

    const inputs = [inputOldPassword, inputPassword, inputRepeatPassword]

    const campos = {
        oldPassword: false,
        password: false,
        confirmPassword: false
    }
    const passwordCompare = () => {
        if (inputPassword.value === inputRepeatPassword.value && campos.password) {
            inputRepeatPassword.classList.remove("isIncorrect")
            inputRepeatPassword.classList.add("isCorrect")
            document.querySelector("small.comparePassword").style.display = "none"
            campos.confirmPassword = true
        } else {
            inputRepeatPassword.classList.remove("isCorrect")
            inputRepeatPassword.classList.add("isIncorrect")
            document.querySelector("small.comparePassword").style.display = "block"
            campos.confirmPassword = false
        }
    }

    const validation = (input, expresion, small, campo) => {
        if (expresion.test(input.value)) {
            input.classList.remove("isIncorrect")
            input.classList.add("isCorrect")
            document.querySelector(`small.${small}`).style.display = "none"
            campos[campo] = true
        } else {
            input.classList.remove("isCorrect")
            input.classList.add("isIncorrect")
            document.querySelector(`small.${small}`).style.display = "block"
            campos[campo] = false
        }
    }

    const inputsValidation = function (e) {
        if (e.target.name === "oldPassword") {
            validation(inputOldPassword, expresiones.oldPassword, "oldPasswordValidations", "oldPassword")
        }

        if (e.target.name === "password") {
            validation(inputPassword, expresiones.password, "passwordValidations", "password")
            passwordCompare()
        }

        if (e.target.name === "confirmPassword") {
            validation(inputRepeatPassword, expresiones.password, "comparePassword", "confirmPassword")
            passwordCompare()
        }
    }

    inputs.forEach(input => {
        input.addEventListener("keyup", inputsValidation)
        input.addEventListener("blur", inputsValidation)
    })

    formPassword.addEventListener("submit", function (e) {
        const { password, confirmPassword, oldPassword } = campos
        if (!password || !confirmPassword || !oldPassword) {
            alert("Los datos a editar son incorrectos")
            e.preventDefault()
        }
    })
})
