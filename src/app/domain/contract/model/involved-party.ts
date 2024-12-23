/**
 * miles-contract
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.124.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { EnumValue } from './enum-value';


/**
 * An involved party
 */
export interface InvolvedParty { 
    /**
     * The ID of the involved party
     */
    involvedPartyId?: string;
    /**
     * The ID of the contact that represents the involved party
     */
    contactId?: string;
    involvedPartyType?: EnumValue;
}
