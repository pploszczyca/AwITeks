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
import { User } from './user';

/**
 * 
 * @export
 * @interface ForumThread
 */
export interface ForumThread {
    /**
     * 
     * @type {number}
     * @memberof ForumThread
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof ForumThread
     */
    'title': string;
    /**
     * 
     * @type {User}
     * @memberof ForumThread
     */
    'creator': User;
    /**
     * 
     * @type {Array<ForumPost>}
     * @memberof ForumThread
     */
    'forumPosts': Array<ForumPost>;
    /**
     * 
     * @type {boolean}
     * @memberof ForumThread
     */
     'isFavourite': boolean;
     /**
     * 
     * @type {Date}
     * @memberof ForumThread
     */
      'dateCreated': Date;
}

