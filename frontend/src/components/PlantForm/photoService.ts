import {base64Header} from "../../utils/constants";

export const toBase64 = (photoInput: HTMLInputElement) => {
    return new Promise((resolve => {
        let file = photoInput.files![0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result!.toString().substring(base64Header.length))
        }
    }))
}
