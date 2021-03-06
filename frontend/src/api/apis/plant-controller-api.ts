/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { AddPlantRequestBody } from '../models';
// @ts-ignore
import { Plant } from '../models';
// @ts-ignore
import { PlantSummary } from '../models';
// @ts-ignore
import { PlantsStats } from '../models';
/**
 * PlantControllerApi - axios parameter creator
 * @export
 */
export const PlantControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Add new plant, assign it to specifier user and specie
         * @param {AddPlantRequestBody} addPlantRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addPlant: async (addPlantRequestBody: AddPlantRequestBody, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'addPlantRequestBody' is not null or undefined
            assertParamExists('addPlant', 'addPlantRequestBody', addPlantRequestBody)
            const localVarPath = `/plants`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT_AUTH required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(addPlantRequestBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Set plant photo
         * @param {number} id 
         * @param {string} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addPlantPhoto: async (id: number, body: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('addPlantPhoto', 'id', id)
            // verify required parameter 'body' is not null or undefined
            assertParamExists('addPlantPhoto', 'body', body)
            const localVarPath = `/plants/{id}/photo`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT_AUTH required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get all plants
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllPlants: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/plants`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT_AUTH required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get all plants summary
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllPlantsSummary: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/plants/summary`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT_AUTH required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get plant by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPlant: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getPlant', 'id', id)
            const localVarPath = `/plants/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT_AUTH required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get plant photo
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPlantPhoto: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getPlantPhoto', 'id', id)
            const localVarPath = `/plants/{id}/photo`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT_AUTH required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get plant stats
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPlantsStats: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/plants/stats`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT_AUTH required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete plant by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removePlant: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('removePlant', 'id', id)
            const localVarPath = `/plants/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT_AUTH required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Changing Favourite flag in plant
         * @param {number} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        togglePlantFavourite: async (plantId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'plantId' is not null or undefined
            assertParamExists('togglePlantFavourite', 'plantId', plantId)
            const localVarPath = `/plants/{plantId}/toggle-favourite`
                .replace(`{${"plantId"}}`, encodeURIComponent(String(plantId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT_AUTH required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Change sendReminders flag in plant
         * @param {number} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        togglePlantReminders: async (plantId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'plantId' is not null or undefined
            assertParamExists('togglePlantReminders', 'plantId', plantId)
            const localVarPath = `/plants/{plantId}/toggle-reminders`
                .replace(`{${"plantId"}}`, encodeURIComponent(String(plantId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT_AUTH required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update plant
         * @param {number} plantId 
         * @param {AddPlantRequestBody} addPlantRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePlant: async (plantId: number, addPlantRequestBody: AddPlantRequestBody, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'plantId' is not null or undefined
            assertParamExists('updatePlant', 'plantId', plantId)
            // verify required parameter 'addPlantRequestBody' is not null or undefined
            assertParamExists('updatePlant', 'addPlantRequestBody', addPlantRequestBody)
            const localVarPath = `/plants/{plantId}`
                .replace(`{${"plantId"}}`, encodeURIComponent(String(plantId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT_AUTH required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(addPlantRequestBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PlantControllerApi - functional programming interface
 * @export
 */
export const PlantControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PlantControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Add new plant, assign it to specifier user and specie
         * @param {AddPlantRequestBody} addPlantRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addPlant(addPlantRequestBody: AddPlantRequestBody, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Plant>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addPlant(addPlantRequestBody, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Set plant photo
         * @param {number} id 
         * @param {string} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addPlantPhoto(id: number, body: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Plant>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addPlantPhoto(id, body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get all plants
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllPlants(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Plant>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllPlants(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get all plants summary
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllPlantsSummary(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<PlantSummary>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllPlantsSummary(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get plant by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPlant(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Plant>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getPlant(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get plant photo
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPlantPhoto(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getPlantPhoto(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get plant stats
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPlantsStats(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PlantsStats>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getPlantsStats(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete plant by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removePlant(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removePlant(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Changing Favourite flag in plant
         * @param {number} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async togglePlantFavourite(plantId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.togglePlantFavourite(plantId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Change sendReminders flag in plant
         * @param {number} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async togglePlantReminders(plantId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.togglePlantReminders(plantId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update plant
         * @param {number} plantId 
         * @param {AddPlantRequestBody} addPlantRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updatePlant(plantId: number, addPlantRequestBody: AddPlantRequestBody, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Plant>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updatePlant(plantId, addPlantRequestBody, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PlantControllerApi - factory interface
 * @export
 */
export const PlantControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PlantControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary Add new plant, assign it to specifier user and specie
         * @param {AddPlantRequestBody} addPlantRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addPlant(addPlantRequestBody: AddPlantRequestBody, options?: any): AxiosPromise<Plant> {
            return localVarFp.addPlant(addPlantRequestBody, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Set plant photo
         * @param {number} id 
         * @param {string} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addPlantPhoto(id: number, body: string, options?: any): AxiosPromise<Plant> {
            return localVarFp.addPlantPhoto(id, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get all plants
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllPlants(options?: any): AxiosPromise<Array<Plant>> {
            return localVarFp.getAllPlants(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get all plants summary
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllPlantsSummary(options?: any): AxiosPromise<Array<PlantSummary>> {
            return localVarFp.getAllPlantsSummary(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get plant by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPlant(id: number, options?: any): AxiosPromise<Plant> {
            return localVarFp.getPlant(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get plant photo
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPlantPhoto(id: number, options?: any): AxiosPromise<string> {
            return localVarFp.getPlantPhoto(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get plant stats
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPlantsStats(options?: any): AxiosPromise<PlantsStats> {
            return localVarFp.getPlantsStats(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete plant by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removePlant(id: number, options?: any): AxiosPromise<void> {
            return localVarFp.removePlant(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Changing Favourite flag in plant
         * @param {number} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        togglePlantFavourite(plantId: number, options?: any): AxiosPromise<void> {
            return localVarFp.togglePlantFavourite(plantId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Change sendReminders flag in plant
         * @param {number} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        togglePlantReminders(plantId: number, options?: any): AxiosPromise<void> {
            return localVarFp.togglePlantReminders(plantId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update plant
         * @param {number} plantId 
         * @param {AddPlantRequestBody} addPlantRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePlant(plantId: number, addPlantRequestBody: AddPlantRequestBody, options?: any): AxiosPromise<Plant> {
            return localVarFp.updatePlant(plantId, addPlantRequestBody, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PlantControllerApi - object-oriented interface
 * @export
 * @class PlantControllerApi
 * @extends {BaseAPI}
 */
export class PlantControllerApi extends BaseAPI {
    /**
     * 
     * @summary Add new plant, assign it to specifier user and specie
     * @param {AddPlantRequestBody} addPlantRequestBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantControllerApi
     */
    public addPlant(addPlantRequestBody: AddPlantRequestBody, options?: AxiosRequestConfig) {
        return PlantControllerApiFp(this.configuration).addPlant(addPlantRequestBody, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Set plant photo
     * @param {number} id 
     * @param {string} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantControllerApi
     */
    public addPlantPhoto(id: number, body: string, options?: AxiosRequestConfig) {
        return PlantControllerApiFp(this.configuration).addPlantPhoto(id, body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get all plants
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantControllerApi
     */
    public getAllPlants(options?: AxiosRequestConfig) {
        return PlantControllerApiFp(this.configuration).getAllPlants(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get all plants summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantControllerApi
     */
    public getAllPlantsSummary(options?: AxiosRequestConfig) {
        return PlantControllerApiFp(this.configuration).getAllPlantsSummary(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get plant by id
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantControllerApi
     */
    public getPlant(id: number, options?: AxiosRequestConfig) {
        return PlantControllerApiFp(this.configuration).getPlant(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get plant photo
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantControllerApi
     */
    public getPlantPhoto(id: number, options?: AxiosRequestConfig) {
        return PlantControllerApiFp(this.configuration).getPlantPhoto(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get plant stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantControllerApi
     */
    public getPlantsStats(options?: AxiosRequestConfig) {
        return PlantControllerApiFp(this.configuration).getPlantsStats(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete plant by id
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantControllerApi
     */
    public removePlant(id: number, options?: AxiosRequestConfig) {
        return PlantControllerApiFp(this.configuration).removePlant(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Changing Favourite flag in plant
     * @param {number} plantId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantControllerApi
     */
    public togglePlantFavourite(plantId: number, options?: AxiosRequestConfig) {
        return PlantControllerApiFp(this.configuration).togglePlantFavourite(plantId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Change sendReminders flag in plant
     * @param {number} plantId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantControllerApi
     */
    public togglePlantReminders(plantId: number, options?: AxiosRequestConfig) {
        return PlantControllerApiFp(this.configuration).togglePlantReminders(plantId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update plant
     * @param {number} plantId 
     * @param {AddPlantRequestBody} addPlantRequestBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantControllerApi
     */
    public updatePlant(plantId: number, addPlantRequestBody: AddPlantRequestBody, options?: AxiosRequestConfig) {
        return PlantControllerApiFp(this.configuration).updatePlant(plantId, addPlantRequestBody, options).then((request) => request(this.axios, this.basePath));
    }
}
