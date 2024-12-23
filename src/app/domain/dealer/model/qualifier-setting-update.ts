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
 * A qualifier setting to update on the service
 */
export interface QualifierSettingUpdate { 
    /**
     * The ID of the qualifier settings
     */
    qualifierSettingId: string;
    /**
     * The value of the qualifier setting. If the qualifier setting contains a list of choices, this parameter holds the selected choice ID. If the qualifier setting is configured as optional, an empty value can be used to clear the value of the setting. However, if the qualifier setting is configured as required, a bad request will be returned. 
     */
    choosenValue: string;
}
