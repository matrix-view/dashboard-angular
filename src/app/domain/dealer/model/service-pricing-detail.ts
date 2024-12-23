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
import { MultiCurrencyValue } from './multi-currency-value';
import { MultiLanguageValue } from './multi-language-value';


/**
 * The price details of a service
 */
export interface ServicePricingDetail { 
    /**
     * The ID of the service pricing detail
     */
    servicePricingDetailId?: string;
    label?: MultiLanguageValue;
    leasePrice?: MultiCurrencyValue;
    leasePriceVat?: MultiCurrencyValue;
    /**
     * The reference for the service
     */
    reference?: string;
    /**
     * The category of the service
     */
    category?: string;
}

