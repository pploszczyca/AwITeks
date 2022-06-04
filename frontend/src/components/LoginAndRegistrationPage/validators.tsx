import {REQUIRED} from "../../utils/constants";

export const validatePassword = (values: string) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{1,}$/;
    if (!values) {
        return REQUIRED;
    } else if (!passwordRegex.test(values)) {
        return  "Hasło musi zawierać przynajmniej jedną cyfrę i co najmniej jedną małą i jedną wielką literę";
    }
};

export const validateConfirmPassword = (pass: any, value: any) => {
    if (!value) {
        return REQUIRED;
    } else if (pass && value) {
        if (pass !== value) {
            return "Hasła się różnią.";
        }
    }
};

export const validateEmail = (email: string) => {
    const regexEmail = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;

    if(!email){
        return REQUIRED;
    } else if (!regexEmail.test(email)){
        return  "Podaj poprawny adres email.";
    }
}

export const validateUsername = (username: string) => {
    const usernameRegex = /^[A-Za-z_][A-Za-z0-9_]{2,}$/;

    if(!username){
        return REQUIRED;
    } else if(!usernameRegex.test(username)){
        return  "Nazwa użytkownika musi zawierać co najmniej 3 znaki, zaczynać się literą oraz składać wyłącznie z liter lub cyfr";
    }
}
