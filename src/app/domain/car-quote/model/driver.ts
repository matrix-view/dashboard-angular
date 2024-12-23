/**
 * miles-car-quote
 * This service is used to create and copy car quotes.
 *
 * The version of the OpenAPI document: 1.74.4
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UnitAccount } from './unit-account';


/**
 * The driver
 */
export interface Driver { 
    driverId?: string;
    identification?: string;
    employeeNumber?: string;
    jobTitle?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dateOfBirth?: string;
    unitAccount?: UnitAccount;
}

