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
import { User } from '../models';
/**
 * UserControllerApi - axios parameter creator
 * @export
 */
export const UserControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Add new user
         * @param {User} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUser: async (user: User, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'user' is not null or undefined
            assertParamExists('addUser', 'user', user)
            const localVarPath = `/users`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(user, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get all users
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllUsers: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/users`;
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
         * @summary Get user by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getUser', 'id', id)
            const localVarPath = `/users/{id}`
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
         * @summary Delete user by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeUser: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('removeUser', 'id', id)
            const localVarPath = `/users/{id}`
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
         * @summary Update user
         * @param {User} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser: async (user: User, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'user' is not null or undefined
            assertParamExists('updateUser', 'user', user)
            const localVarPath = `/users`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(user, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserControllerApi - functional programming interface
 * @export
 */
export const UserControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Add new user
         * @param {User} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addUser(user: User, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addUser(user, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get all users
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllUsers(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<object>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllUsers(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get user by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUser(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUser(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete user by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeUser(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeUser(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update user
         * @param {User} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateUser(user: User, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateUser(user, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UserControllerApi - factory interface
 * @export
 */
export const UserControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary Add new user
         * @param {User} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUser(user: User, options?: any): AxiosPromise<string> {
            return localVarFp.addUser(user, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get all users
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllUsers(options?: any): AxiosPromise<Array<object>> {
            return localVarFp.getAllUsers(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get user by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser(id: number, options?: any): AxiosPromise<void> {
            return localVarFp.getUser(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete user by id
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeUser(id: number, options?: any): AxiosPromise<void> {
            return localVarFp.removeUser(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update user
         * @param {User} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser(user: User, options?: any): AxiosPromise<void> {
            return localVarFp.updateUser(user, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserControllerApi - object-oriented interface
 * @export
 * @class UserControllerApi
 * @extends {BaseAPI}
 */
export class UserControllerApi extends BaseAPI {
    /**
     * 
     * @summary Add new user
     * @param {User} user 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public addUser(user: User, options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).addUser(user, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get all users
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public getAllUsers(options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).getAllUsers(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get user by id
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public getUser(id: number, options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).getUser(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete user by id
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public removeUser(id: number, options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).removeUser(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update user
     * @param {User} user 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public updateUser(user: User, options?: AxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).updateUser(user, options).then((request) => request(this.axios, this.basePath));
    }
}