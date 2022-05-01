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
import { AddSpeciesRequestBody } from '../models';
// @ts-ignore
import { Species } from '../models';
/**
 * SpeciesControllerApi - axios parameter creator
 * @export
 */
export const SpeciesControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Add new species
         * @param {AddSpeciesRequestBody} addSpeciesRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addSpecies: async (addSpeciesRequestBody: AddSpeciesRequestBody, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'addSpeciesRequestBody' is not null or undefined
            assertParamExists('addSpecies', 'addSpeciesRequestBody', addSpeciesRequestBody)
            const localVarPath = `/species`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(addSpeciesRequestBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get all species
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllSpecies: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/species`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
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
         * @summary Get specific specie by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSpecies: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getSpecies', 'id', id)
            const localVarPath = `/species/{id}`
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
         * @summary Delete specie by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeSpecies: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('removeSpecies', 'id', id)
            const localVarPath = `/species/{id}`
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
         * @summary Update specie
         * @param {Species} species 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateSpecies: async (species: Species, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'species' is not null or undefined
            assertParamExists('updateSpecies', 'species', species)
            const localVarPath = `/species`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(species, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SpeciesControllerApi - functional programming interface
 * @export
 */
export const SpeciesControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SpeciesControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Add new species
         * @param {AddSpeciesRequestBody} addSpeciesRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addSpecies(addSpeciesRequestBody: AddSpeciesRequestBody, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Species>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addSpecies(addSpeciesRequestBody, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get all species
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllSpecies(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Species>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllSpecies(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get specific specie by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSpecies(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Species>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getSpecies(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete specie by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeSpecies(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeSpecies(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update specie
         * @param {Species} species 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateSpecies(species: Species, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateSpecies(species, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * SpeciesControllerApi - factory interface
 * @export
 */
export const SpeciesControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SpeciesControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary Add new species
         * @param {AddSpeciesRequestBody} addSpeciesRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addSpecies(addSpeciesRequestBody: AddSpeciesRequestBody, options?: any): AxiosPromise<Species> {
            return localVarFp.addSpecies(addSpeciesRequestBody, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get all species
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllSpecies(options?: any): AxiosPromise<Array<Species>> {
            return localVarFp.getAllSpecies(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get specific specie by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSpecies(id: number, options?: any): AxiosPromise<Species> {
            return localVarFp.getSpecies(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete specie by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeSpecies(id: number, options?: any): AxiosPromise<void> {
            return localVarFp.removeSpecies(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update specie
         * @param {Species} species 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateSpecies(species: Species, options?: any): AxiosPromise<void> {
            return localVarFp.updateSpecies(species, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SpeciesControllerApi - object-oriented interface
 * @export
 * @class SpeciesControllerApi
 * @extends {BaseAPI}
 */
export class SpeciesControllerApi extends BaseAPI {
    /**
     * 
     * @summary Add new species
     * @param {AddSpeciesRequestBody} addSpeciesRequestBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SpeciesControllerApi
     */
    public addSpecies(addSpeciesRequestBody: AddSpeciesRequestBody, options?: AxiosRequestConfig) {
        return SpeciesControllerApiFp(this.configuration).addSpecies(addSpeciesRequestBody, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get all species
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SpeciesControllerApi
     */
    public getAllSpecies(options?: AxiosRequestConfig) {
        return SpeciesControllerApiFp(this.configuration).getAllSpecies(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get specific specie by id
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SpeciesControllerApi
     */
    public getSpecies(id: number, options?: AxiosRequestConfig) {
        return SpeciesControllerApiFp(this.configuration).getSpecies(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete specie by id
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SpeciesControllerApi
     */
    public removeSpecies(id: number, options?: AxiosRequestConfig) {
        return SpeciesControllerApiFp(this.configuration).removeSpecies(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update specie
     * @param {Species} species 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SpeciesControllerApi
     */
    public updateSpecies(species: Species, options?: AxiosRequestConfig) {
        return SpeciesControllerApiFp(this.configuration).updateSpecies(species, options).then((request) => request(this.axios, this.basePath));
    }
}
