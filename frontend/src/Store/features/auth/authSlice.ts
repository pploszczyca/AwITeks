import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData, UserLoginRequestBody } from '../../../api';
import { getApis } from '../../../api/initializeApis';

// As long as we dont have refresh tokens access tokens will be stored in local storage
const LOCAL_STORAGE_AUTH_KEY = 'JWT';


export const login = createAsyncThunk(
    'auth/login',
    async (loginData: UserLoginRequestBody, thunkApi) => {
        const response = await getApis().authApi.login(loginData);
        return response.data;
    }
)

export type AuthState = {
    authData: AuthData | null;
    isLoggedIn: boolean;
    isFetching: boolean;
};



function buildInitialState(): AuthState {
    const storedAuthData = window?.localStorage?.getItem(LOCAL_STORAGE_AUTH_KEY);
    const authData: AuthData = storedAuthData ? JSON.parse(storedAuthData) : null;
    const isLoggedIn = !!authData; // TODO check expiresIn

    return {
        authData,
        isLoggedIn,
        isFetching: false,
    };
}


function persistAuthState(auth: AuthData): void {
    window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(auth));
}

function clearAuthState(): void {
    window.localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
}


export const authSlice = createSlice({
    name: 'auth',
    initialState: buildInitialState(),
    reducers: {
        logout: (state) => {
            state.authData = null;
            state.isLoggedIn = false;
            clearAuthState();
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.authData = action.payload;
                state.isLoggedIn = true;
                state.isFetching = false;

                persistAuthState(action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                // TODO
                console.log("failed to login");
            })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;