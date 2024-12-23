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


/**
 * Miles API v1 representation of a currency value.
 */
export interface MultiCurrencyValue { 
    /**
     * The value that holds the currency amount
     */
    value?: number;
    /**
     * The currency amount in a different currency
     */
    currencyValue?: number;
    /**
     * The ID of the currency
     */
    currencyId?: string;
}
