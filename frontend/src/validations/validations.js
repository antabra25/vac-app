export function isEmail(email) {
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    return emailRegex.test(email)
}

export function isNumber(number) {
    const numberRegex = /^[0-9]+$/
    return numberRegex.test(number)
}

export function isPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone)
}

export function isEmpty(value) {
    return value.trim() === ""
}


export function isMaxLength(value, length) {
    return value.length <= length
}

export function isMinLength(value, length) {
    return value.length >= length
}

export function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    return passwordRegex.test(password)
}

export function isNumberBetween(number, start, end) {
    return isNumber(number) && number >= start && number <= end
}

export function isAlpha(alpha) {

    const alphaRegex = /^[a-zA-Z]+$/
    return alphaRegex.test(alpha)
}

export function isAlphaNumeric(alphaNumeric) {

    const alphaNumericRegex = /^[a-zA-Z0-9 ]+$/
    return alphaNumericRegex.test(alphaNumeric)
}




