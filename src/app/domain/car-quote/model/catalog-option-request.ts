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
import { SimpleEnumValue } from './simple-enum-value';


/**
 * A list of catalog options
 */
export interface CatalogOptionRequest { 
    /**
     * The ID of the catalog option. One of the `catalogOptionId` or `optionCode` parameters is required, but both cannot be set together.
     */
    catalogOptionId?: string;
    /**
     * The code of the catalog option. One of the `catalogOptionId` or `optionCode` parameters is required, but both cannot be set together.
     */
    optionCode?: string;
    catalogPrice?: MultiCurrencyValue;
    catalogVatCode?: SimpleEnumValue;
}
