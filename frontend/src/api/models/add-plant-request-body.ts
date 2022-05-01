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



/**
 * 
 * @export
 * @interface AddPlantRequestBody
 */
export interface AddPlantRequestBody {
    /**
     * 
     * @type {string}
     * @memberof AddPlantRequestBody
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof AddPlantRequestBody
     */
    'insolation': AddPlantRequestBodyInsolationEnum;
    /**
     * 
     * @type {string}
     * @memberof AddPlantRequestBody
     */
    'lastWateringDate': string;
    /**
     * 
     * @type {string}
     * @memberof AddPlantRequestBody
     */
    'lastFertilizationDate': string;
    /**
     * 
     * @type {string}
     * @memberof AddPlantRequestBody
     */
    'note': string;
    /**
     * 
     * @type {number}
     * @memberof AddPlantRequestBody
     */
    'speciesId': number;
}

export const AddPlantRequestBodyInsolationEnum = {
    Low: 'LOW',
    Medium: 'MEDIUM',
    High: 'HIGH'
} as const;

export type AddPlantRequestBodyInsolationEnum = typeof AddPlantRequestBodyInsolationEnum[keyof typeof AddPlantRequestBodyInsolationEnum];

