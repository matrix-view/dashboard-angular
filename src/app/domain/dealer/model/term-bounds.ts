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


/**
 * The term information
 */
export interface TermBounds { 
    /**
     * The minimum term that is allowed (inclusive)
     */
    minimumValue?: number;
    /**
     * The default value of the term
     */
    defaultValue?: number;
    /**
     * The maximum term that is allowed (exclusive)
     */
    maximumValue?: number;
    /**
     * Indicates whether the term is a required property
     */
    isMandatory?: boolean;
}

