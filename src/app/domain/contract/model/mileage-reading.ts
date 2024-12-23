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
import { DoubleUnitValue } from './double-unit-value';
import { EnumValue } from './enum-value';


/**
 * Mileage reading
 */
export interface MileageReading { 
    /**
     * Reading ID
     */
    mileageReadingId?: string;
    /**
     * Contract ID
     */
    contractId?: string;
    /**
     * Car ID
     */
    carId?: string;
    /**
     * Date of the reading
     */
    mileageReadingDateTime?: string;
    distance?: DoubleUnitValue;
    mileage?: DoubleUnitValue;
    type?: EnumValue;
    serviceType?: EnumValue;
}

