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
import { QualifierValue } from './qualifier-value';


/**
 * An accessory option to add
 */
export interface AddAccessoryOption { 
    /**
     * The generic option ID for the accessory option
     */
    genericOptionId: string;
    /**
     * The description to set to the option if the accessory option is allowed to override the description. Otherwise, this field will be ignored.
     */
    description?: string;
    /**
     * The price of the accessory option
     */
    accessoryPrice?: number;
    qualifier1?: QualifierValue;
    qualifier2?: QualifierValue;
    qualifier3?: QualifierValue;
}

