window.addEventListener("load", function () {
    const expresiones = {
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        password: /^[a-zA-Z0-9!@#$&*]{1,100}$/
    }

    // Validaciones
    const formulario = document.querySelector("#formulario")
    const inputEmail = document.querySelector("#formulario input#email")
    const inputPassword = document.querySelector("#formulario input#user-password")

    const inputs = [inputEmail, inputPassword]

    const campos = {
        email: false,
        password: false
    }

    const validation = (input, expresion, small, campo) => {
        if (expresion.test(input.value)) {
            input.classList.remove("isIncorrect")
            document.querySelector(`small.${small}`).style.display = "none"
            campos[campo] = true
        } else {
            input.classList.add("isIncorrect")
            document.querySelector(`small.${small}`).style.display = "block"
            campos[campo] = false
        }
    }

    const inputsValidation = function (e) {
        if (e.target.name === "email") {
            validation(inputEmail, expresiones.email, "emailValidations", "email")
        }

        if (e.target.name === "password") {
            validation(inputPassword, expresiones.password, "passwordValidations", "password")
        }
    }

    inputs.forEach(input => {
        input.addEventListener("keyup", inputsValidation)
        input.addEventListener("blur", inputsValidation)
    })

    formulario.addEventListener("submit", function (e) {

    })
})
