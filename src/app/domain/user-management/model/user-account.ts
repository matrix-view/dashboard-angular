/**
 * miles-user-management
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.12.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { EnumValue } from './enum-value';
import { FindUserGroup } from './find-user-group';


export interface UserAccount { 
    /**
     * The signOn ID of the user
     */
    signOnId?: string;
    title?: EnumValue;
    /**
     * The first name of the user
     */
    firstName?: string;
    /**
     * The last name of the user
     */
    lastName?: string;
    /**
     * Email of the user
     */
    email?: string;
    /**
     * Language that the user has set
     */
    language?: string;
    /**
     * The date when the user logged in for the last time
     */
    lastLogonDate?: string;
    /**
     * Whether the account is expired or not
     */
    expired?: boolean;
    /**
     * The business unit ID linked to the user
     */
    businessUnitId?: string;
    /**
     * List of groups where the user is part of
     */
    userGroups?: Array<FindUserGroup>;
}

