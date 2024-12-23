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
import { MultiLanguageValue } from './multi-language-value';


export interface ProductSettingChoice { 
    /**
     * The ID of the product setting choice
     */
    id?: string;
    label?: MultiLanguageValue;
    /**
     * Use isSelected instead.
     */
    selected?: boolean;
    /**
     * Indicates if the product setting choice is selected. Defaulted to false.
     */
    isSelected?: boolean;
    /**
     * The total lease price of the choice\'s lease service components, excluding VAT
     */
    leasePrice?: number;
    /**
     * The total VAT price of the choice\'s lease service components
     */
    leasePriceVat?: number;
}

