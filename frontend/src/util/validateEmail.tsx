const validateEmail = (email: String) => {
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]*$/;
    if (email.match(emailRegex)) return true;
    return false;
}

export default validateEmail; 