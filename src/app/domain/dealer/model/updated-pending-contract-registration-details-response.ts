/**
 * miles-dealer-pos
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.8.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { DynamicAttributeValue } from './dynamic-attribute-value';
import { EnumValue } from './enum-value';


export interface UpdatedPendingContractRegistrationDetailsResponse { 
    vehicleStatus?: EnumValue;
    /**
     * The Vehicle Identification Number that acts as a unique identifier for the vehicle
     */
    vin?: string;
    /**
     * The date on which the vehicle was first registered
     */
    firstRegistrationDate?: string;
    /**
     * The dynamic attributes of the registration details
     */
    dynamicAttributes?: { [key: string]: DynamicAttributeValue; };
}

