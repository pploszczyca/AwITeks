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
 * @interface Species
 */
export interface Species {
    /**
     * 
     * @type {number}
     * @memberof Species
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof Species
     */
    'name': string;
    /**
     * 
     * @type {number}
     * @memberof Species
     */
    'maxAge': number;
    /**
     * 
     * @type {string}
     * @memberof Species
     */
    'neededInsolation': "LOW" | "MEDIUM" | "HIGH";
    /**
     * 
     * @type {number}
     * @memberof Species
     */
    'waterDose': number;
    /**
     * 
     * @type {number}
     * @memberof Species
     */
    'waterRoutine': number;
    /**
     * 
     * @type {number}
     * @memberof Species
     */
    'fertilizationRoutine': number;
    /**
     * 
     * @type {string}
     * @memberof Species
     */
    'fertilizationDose': "LOW" | "MEDIUM" | "HIGH";
    /**
     * 
     * @type {number}
     * @memberof Species
     */
    'creatorId': number;
}

export const SpeciesNeededInsolationEnum = {
    Low: 'LOW',
    Medium: 'MEDIUM',
    High: 'HIGH'
} as const;

export type SpeciesNeededInsolationEnum = typeof SpeciesNeededInsolationEnum[keyof typeof SpeciesNeededInsolationEnum];
export const SpeciesFertilizationDoseEnum = {
    Low: 'LOW',
    Medium: 'MEDIUM',
    High: 'HIGH'
} as const;

export type SpeciesFertilizationDoseEnum = typeof SpeciesFertilizationDoseEnum[keyof typeof SpeciesFertilizationDoseEnum];


