export const validatePassword = (values: string) => {
    let error = "";
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{1,}$/;
    if (!values) {
        error = "Wymagane";
    } else if (!passwordRegex.test(values)) {
        error = "Hasło musi zawierać przynajmniej jedną cyfrę i co najmniej jedną małą i jedną wielką literę";
    }
    return error;
};

export const validateConfirmPassword = (pass: any, value: any) => {
    let error = "";
    if (!value) {
        error = "Wymagane";
    } else if (pass && value) {
        if (pass !== value) {
            error = "Hasła się różnią.";
        }
    }
    return error;
};

export const validateEmail = (email: string) => {
    const regexEmail = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
    let error = "";

    if(!email){
        error = "Wymagane";
    } else if (!regexEmail.test(email)){
        error = "Podaj poprawny adres email.";
    }
    return error;
}

export const validateUsername = (username: string) => {
    const usernameRegex = /^[A-Za-z_][A-Za-z0-9_]{2,}$/;
    let error = "";

    if(!username){
        error = "Wymagane";
    } else if(!usernameRegex.test(username)){
        error = "Nazwa użytkownika musi zawierać co najmniej 3 znaki, zaczynać się literą oraz składać wyłącznie z liter lub cyfr";
    }

    return error;
}
