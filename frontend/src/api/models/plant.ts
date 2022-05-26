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


import { Species } from './species';

/**
 * 
 * @export
 * @interface Plant
 */
export interface Plant {
    /**
     * 
     * @type {number}
     * @memberof Plant
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'name': string;
    /**
     * 
     * @type {Species}
     * @memberof Plant
     */
    'species': Species;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'note'?: string;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'actualInsolation': PlantActualInsolationEnum;
    /**
     * 
     * @type {boolean}
     * @memberof Plant
     */
    'favourite': boolean;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'photo': string;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'lastWateringDate': string;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'lastFertilizationDate': string;
}

export const PlantActualInsolationEnum = {
    Low: 'LOW',
    Medium: 'MEDIUM',
    High: 'HIGH'
} as const;

export type PlantActualInsolationEnum = typeof PlantActualInsolationEnum[keyof typeof PlantActualInsolationEnum];


