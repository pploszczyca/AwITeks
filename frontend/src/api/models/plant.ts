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


import { Activity } from './activity';
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
    'spiece': Species;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'note': string;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'actualInsolation': PlantActualInsolationEnum;
    /**
     * 
     * @type {Array<Activity>}
     * @memberof Plant
     */
    'plantActivities': Array<Activity>;
}

export const PlantActualInsolationEnum = {
    Low: 'LOW',
    Medium: 'MEDIUM',
    High: 'HIGH'
} as const;

export type PlantActualInsolationEnum = typeof PlantActualInsolationEnum[keyof typeof PlantActualInsolationEnum];


