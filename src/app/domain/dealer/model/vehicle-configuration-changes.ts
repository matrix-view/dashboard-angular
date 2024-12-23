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
import { RemoveVehicleOption } from './remove-vehicle-option';
import { AddVehicleOptions } from './add-vehicle-options';


/**
 * The changes that need to be applied to the configuration of the vehicle linked to the pending contract via an amendment quote
 */
export interface VehicleConfigurationChanges { 
    addVehicleOptions?: AddVehicleOptions;
    /**
     * The list of vehicle options to remove
     */
    removeVehicleOptions?: Array<RemoveVehicleOption>;
}
