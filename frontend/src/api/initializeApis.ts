import { ActivityControllerApi, SpeciesControllerApi, UserControllerApi } from "./api";
import { PlantControllerApi } from "./apis/plant-controller-api";
// import { Configuration } from "./configuration";


type Apis = {
    plantsApi: PlantControllerApi,
    speciesApi: SpeciesControllerApi,
    activityApi: ActivityControllerApi,
    userApi: UserControllerApi
};


let apis: Apis | undefined;


export const initializeApis = () => {
    // TODO config for dev/prod from env
    const configuration = undefined; /* new Configuration(...) */

    apis = {
        plantsApi: new PlantControllerApi(configuration),
        speciesApi: new SpeciesControllerApi(configuration),
        activityApi: new ActivityControllerApi(configuration),
        userApi: new UserControllerApi(configuration)
    }
};

initializeApis();

export const getApis = (): Apis => {
    if (!apis) {
        initializeApis();
    }

    return apis!;
}

