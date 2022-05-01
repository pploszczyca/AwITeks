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
    if (pass && value) {
        if (pass !== value) {
            error = "Brak zgodności, hasło niepoprawne z podanym wyżej.";
        }
    }
    return error;
};
