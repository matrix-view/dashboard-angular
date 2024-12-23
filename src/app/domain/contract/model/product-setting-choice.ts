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
import { MultiLanguageValue } from './multi-language-value';


/**
 * ProductSettingChoice
 */
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
     * Indicates if the qualifier setting choice is selected. Defaulted to false.
     */
    isSelected?: boolean;
}

