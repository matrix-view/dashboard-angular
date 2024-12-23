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
import { QualifierSettingChoice } from './qualifier-setting-choice';


/**
 * A qualifier setting of the service
 */
export interface QualifierSetting { 
    /**
     * ID of the qualifier settings
     */
    qualifierSettingId?: string;
    /**
     * A list of service choice IDs that uses this qualifier setting
     */
    condition?: Array<string>;
    /**
     * The value
     */
    value?: string;
    /**
     * The kind of data type
     */
    dataType?: string;
    /**
     * The default value of the qualifier setting
     */
    defaultValue?: string;
    /**
     * The minimum value of the qualifier setting
     */
    minValue?: number;
    /**
     * The maximum value of the qualifier setting
     */
    maxValue?: number;
    /**
     * Indicates whether the qualifier setting is required
     */
    isRequired?: boolean;
    /**
     * A list of qualifier setting choices
     */
    choices?: Array<QualifierSettingChoice>;
}

