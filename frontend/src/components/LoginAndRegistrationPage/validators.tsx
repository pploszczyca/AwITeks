export const validatePassword = (values: string) => {
    let error = "";
    const passwordRegex = /(?=.*[0-9])/;
    if (!values) {
        error = "Wymagane";
    } else if (values.length < 8) {
        error = "Hasło musi mieć długość przynajmniej 8 znaków.";
    } else if (!passwordRegex.test(values)) {
        error = "Hasło musi zawierać przynajmniej jedną cyfrę";
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
    const regexEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    let error = "";

    if(!email){
        error = "Wymagane";
    } else if (!regexEmail.test(email)){
        error = "Podaj poprawny adres email.";
    }
    return error;
}
