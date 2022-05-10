import { store } from "../../store";
import { isTokenExipired, logout } from "./authSlice";


export async function getAccessToken(): Promise<string> {
    const auth = store.getState().auth;

    if (auth.isLoggedIn) {
        if (isTokenExipired(auth.authData!)) {
            store.dispatch(logout());
        }
        else {
            return auth.authData!.accessToken;
        }
    }

    // TODO refresh token
    return new Promise((_, rej) => rej("access token not found or expired"));
}