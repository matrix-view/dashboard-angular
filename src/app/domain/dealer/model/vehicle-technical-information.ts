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
import { DoubleUnitValue } from './double-unit-value';
import { EnumValue } from './enum-value';


/**
 * The technical specifications of the vehicle
 */
export interface VehicleTechnicalInformation { 
    consumption?: DoubleUnitValue;
    /**
     * The CO2 emission of the vehicle
     */
    co2Emission?: number;
    /**
     * The power of the vehicle in kW
     */
    kw?: number;
    /**
     * The specification of the tire
     */
    tireSpecification?: string;
    bodyStyle?: EnumValue;
    fuelType?: EnumValue;
    netWeight?: DoubleUnitValue;
    maximumWeight?: DoubleUnitValue;
    maximumLoad?: DoubleUnitValue;
    trailerLoadBraked?: DoubleUnitValue;
    trailerLoadUnbraked?: DoubleUnitValue;
}

