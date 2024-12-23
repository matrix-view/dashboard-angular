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
 * Miles API v1 representation of a unit value. It typically is part of a DoubleUnitValue or IntegerUnitValue.
 */
export interface UnitValue { 
    /**
     * The enumeration ID of the unit
     */
    enumId?: string;
    /**
     * The multi-language ID that can be used to retrieve the translation in other languages
     */
    multiLanguageId?: string;
    /**
     * The translation of the unit in human-readable format
     */
    translation?: string;
}
