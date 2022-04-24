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
import { Activity } from '../models';
/**
 * ActivityControllerApi - axios parameter creator
 * @export
 */
export const ActivityControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Add new activity to plant
         * @param {number} plantID 
         * @param {Activity} activity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addActivity: async (plantID: number, activity: Activity, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'plantID' is not null or undefined
            assertParamExists('addActivity', 'plantID', plantID)
            // verify required parameter 'activity' is not null or undefined
            assertParamExists('addActivity', 'activity', activity)
            const localVarPath = `/activity/{plantID}`
                .replace(`{${"plantID"}}`, encodeURIComponent(String(plantID)));
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
            localVarRequestOptions.data = serializeDataIfNeeded(activity, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete activity
         * @param {number} plantId 
         * @param {number} activityId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeActivity: async (plantId: number, activityId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'plantId' is not null or undefined
            assertParamExists('removeActivity', 'plantId', plantId)
            // verify required parameter 'activityId' is not null or undefined
            assertParamExists('removeActivity', 'activityId', activityId)
            const localVarPath = `/activity/{plantId}/{activityId}`
                .replace(`{${"plantId"}}`, encodeURIComponent(String(plantId)))
                .replace(`{${"activityId"}}`, encodeURIComponent(String(activityId)));
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
    }
};

/**
 * ActivityControllerApi - functional programming interface
 * @export
 */
export const ActivityControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ActivityControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Add new activity to plant
         * @param {number} plantID 
         * @param {Activity} activity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addActivity(plantID: number, activity: Activity, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addActivity(plantID, activity, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete activity
         * @param {number} plantId 
         * @param {number} activityId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeActivity(plantId: number, activityId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeActivity(plantId, activityId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ActivityControllerApi - factory interface
 * @export
 */
export const ActivityControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ActivityControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary Add new activity to plant
         * @param {number} plantID 
         * @param {Activity} activity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addActivity(plantID: number, activity: Activity, options?: any): AxiosPromise<void> {
            return localVarFp.addActivity(plantID, activity, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete activity
         * @param {number} plantId 
         * @param {number} activityId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeActivity(plantId: number, activityId: number, options?: any): AxiosPromise<void> {
            return localVarFp.removeActivity(plantId, activityId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ActivityControllerApi - object-oriented interface
 * @export
 * @class ActivityControllerApi
 * @extends {BaseAPI}
 */
export class ActivityControllerApi extends BaseAPI {
    /**
     * 
     * @summary Add new activity to plant
     * @param {number} plantID 
     * @param {Activity} activity 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ActivityControllerApi
     */
    public addActivity(plantID: number, activity: Activity, options?: AxiosRequestConfig) {
        return ActivityControllerApiFp(this.configuration).addActivity(plantID, activity, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete activity
     * @param {number} plantId 
     * @param {number} activityId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ActivityControllerApi
     */
    public removeActivity(plantId: number, activityId: number, options?: AxiosRequestConfig) {
        return ActivityControllerApiFp(this.configuration).removeActivity(plantId, activityId, options).then((request) => request(this.axios, this.basePath));
    }
}