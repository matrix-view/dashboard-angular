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
 * Miles API v1 representation of an enum value. It contains additional values representing the attribute type and multi-language context.
 */
export interface EnumValue { 
    /**
     * The enumeration ID
     */
    enumId?: string;
    /**
     *  The ID of the attribute type
     */
    attributeTypeId?: string;
    /**
     * This will be represented as a separate attribute value
     */
    enumGroupId?: string;
    /**
     * The multi-language ID that can be used to retrieve the translation in other languages
     */
    multiLanguageId?: string;
    /**
     * The translation of the enumeration ID in human-readable format
     */
    translation?: string;
    /**
     * Indicates whether this object can still be used
     */
    enabled?: boolean;
}

