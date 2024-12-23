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
import { EnumValue } from './enum-value';


/**
 * The customer
 */
export interface Customer { 
    customerId?: string;
    businessUnitLegalName?: string;
    tradingName?: string;
    taxLiability?: EnumValue;
}

