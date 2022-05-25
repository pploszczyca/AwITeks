import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface LoaderState {
    isLoading: boolean;
    loadingPages: any;
    loadingPagesCount: number;
};

const initialState: LoaderState = {
    isLoading: false,
    loadingPages: {},
    loadingPagesCount: 0,
};

// for testing only, not used yet, ignore
export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        loadingStarted: (state, pageKeyAction: PayloadAction<string>) => {
            state.isLoading = true;
            if (!state.loadingPages[pageKeyAction.payload]) {
                state.loadingPagesCount++;
                state.loadingPages[pageKeyAction.payload] = true;
            }
        },
        loadingFinished: (state, pageKeyAction: PayloadAction<string>) => {
            if (state.loadingPages[pageKeyAction.payload]) {
                state.loadingPages[pageKeyAction.payload] = false;
                state.loadingPagesCount--;
            }
            state.isLoading = state.loadingPagesCount !== 0;
        }
    }
});

export const { loadingStarted, loadingFinished } = loaderSlice.actions;

export default loaderSlice.reducer;
