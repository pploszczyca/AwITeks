import {getAccessToken} from "../Store/features/auth/auth";
import {ActivityControllerApi, ForumControllerApi, SpeciesControllerApi, UserControllerApi} from "./api";
import {AuthControllerApi} from "./apis/auth-controller-api";
import {PlantControllerApi} from "./apis/plant-controller-api";
import {Configuration} from "./configuration";


type Apis = {
    authApi: AuthControllerApi,
    plantsApi: PlantControllerApi,
    speciesApi: SpeciesControllerApi,
    activityApi: ActivityControllerApi,
    userApi: UserControllerApi,
    forumApi: ForumControllerApi
};


let apis: Apis | undefined;


export const initializeApis = () => {
    // TODO config for dev/prod from env
    const configuration = new Configuration({
        accessToken: getAccessToken
    });

    apis = {
        authApi: new AuthControllerApi(configuration),
        plantsApi: new PlantControllerApi(configuration),
        speciesApi: new SpeciesControllerApi(configuration),
        activityApi: new ActivityControllerApi(configuration),
        userApi: new UserControllerApi(configuration),
        forumApi: new ForumControllerApi(configuration)
    };
};

initializeApis();

export const getApis = (): Apis => {
    if (!apis) {
        initializeApis();
    }
    return apis!;
}

