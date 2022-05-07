import { store } from "../../store";

export async function getAccessToken(): Promise<string> {
    const auth = store.getState().auth;

    if (auth.isLoggedIn) {
        // TODO check expiresIn
        return auth.authData!.accessToken;
    }

    // TODO refresh token
    return new Promise((_, rej) => rej("access token not found or invalid"));
}