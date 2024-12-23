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


export interface RegisterMileageReadingRequest { 
    /**
     * The zoned date and time of the mileage reading
     */
    mileageReadingDateTime: string;
    /**
     * The mileage reading on the vehicle
     */
    mileage: number;
    /**
     * The enum ID of the unit of the mileage
     */
    mileageUnitEnumId: string;
}
