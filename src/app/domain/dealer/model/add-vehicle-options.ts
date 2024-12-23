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
import { AddAccessoryOption } from './add-accessory-option';
import { AddFactoryOption } from './add-factory-option';


/**
 * The vehicle options to add
 */
export interface AddVehicleOptions { 
    /**
     * The list of factory options to add
     */
    factoryOptions?: Array<AddFactoryOption>;
    /**
     * The list of accessory options to add
     */
    accessoryOptions?: Array<AddAccessoryOption>;
}
