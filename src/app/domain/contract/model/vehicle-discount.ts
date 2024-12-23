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
import { MultiCurrencyValue } from './multi-currency-value';


/**
 * Vehicle discounts
 */
export interface VehicleDiscount { 
    /**
     * The ID of the vehicle discount
     */
    vehicleDiscountId?: string;
    /**
     * The ID of the discount type ID
     */
    discountTypeId?: string;
    /**
     * Indicates whether the vehicle discount has been communicated to the dealer
     */
    isCommunicatedToDealer?: boolean;
    /**
     * Percentage external
     */
    percentageExternal?: number;
    /**
     * Percentage internal
     */
    percentageInternal?: number;
    externalAmount?: MultiCurrencyValue;
    internalAmount?: MultiCurrencyValue;
}

