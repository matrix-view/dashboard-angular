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
import { MultiLanguageValue } from './multi-language-value';
import { EnumValue } from './enum-value';


/**
 * Car options
 */
export interface CarOption { 
    /**
     * The ID of the car option
     */
    carOptionId?: string;
    catalogPrice?: MultiCurrencyValue;
    catalogPriceInclVAT?: MultiCurrencyValue;
    catalogVAT?: MultiCurrencyValue;
    description?: MultiLanguageValue;
    discountAmount?: MultiCurrencyValue;
    /**
     * The discount percentage
     */
    discountPercentage?: number;
    /**
     * Indicates whether the bike option is standard
     */
    isStandard?: boolean;
    /**
     * The option code of the bike option
     */
    optionCode?: string;
    annotations?: MultiLanguageValue;
    optionType?: EnumValue;
    /**
     * List of car options
     */
    options?: Array<CarOption>;
    /**
     * List of car option packs
     */
    optionPacks?: Array<CarOption>;
}

