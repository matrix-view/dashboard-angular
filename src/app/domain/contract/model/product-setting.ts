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
import { ProductSettingChoice } from './product-setting-choice';
import { QualifierSetting } from './qualifier-setting';


/**
 * ProductSetting
 */
export interface ProductSetting { 
    /**
     * The reference of the product setting
     */
    reference?: string;
    /**
     * The list of product setting choices found
     */
    choices?: Array<ProductSettingChoice>;
    /**
     * The list of qualifier settings found
     */
    qualifierSettings?: Array<QualifierSetting>;
}

