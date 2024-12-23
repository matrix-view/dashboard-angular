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
import { MultiCurrencyValue } from './multi-currency-value';


/**
 * Vehicle discount configurations
 */
export interface VehicleDiscountConfiguration { 
    vehicleDiscountConfigurationId?: string;
    discountTypeId?: string;
    amount?: MultiCurrencyValue;
    percentage?: number;
}

