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


import { ForumPost } from './forum-post';
import { ForumThread } from './forum-thread';
import { Plant } from './plant';

/**
 * 
 * @export
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {number}
     * @memberof User
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    'username': string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    'email': string;
    /**
     * 
     * @type {Array<Plant>}
     * @memberof User
     */
    'userPlants': Array<Plant>;
    /**
     * 
     * @type {Array<ForumPost>}
     * @memberof User
     */
    'forumPostList': Array<ForumPost>;
    /**
     * 
     * @type {Array<ForumThread>}
     * @memberof User
     */
    'forumThreadList': Array<ForumThread>;
    /**
     * 
     * @type {Array<ForumThread>}
     * @memberof User
     */
    'followedThreads': Array<ForumThread>;
}

