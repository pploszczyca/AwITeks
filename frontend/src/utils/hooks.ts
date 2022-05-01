import { useEffect } from "react";
import { loadingFinished, loadingStarted } from "../Store/features/loader/loaderSlice";
import { useAppDispatch } from "../Store/store";

// for testing only, not used yet, ignore
export const usePageLoader = (isLoading: boolean, pageKey: string): boolean => {
    const dispatch = useAppDispatch();

    if (isLoading) {
        dispatch(loadingStarted(pageKey));
    }
    else {
        dispatch(loadingFinished(pageKey));
    }

    useEffect(() => {
        return () => {
            dispatch(loadingFinished(pageKey));
        };
    }, [dispatch, pageKey]);

    return isLoading;
};