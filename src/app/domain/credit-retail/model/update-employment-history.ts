/**
 * miles-credit-retail
 * This functional service supports the creation and follow-up of **credit applications**.    For more information, check the **Read Me** tab.
 *
 * The version of the OpenAPI document: 1.29.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { SimpleEnumValue } from './simple-enum-value';
import { SimpleDynamicAttributeValue } from './simple-dynamic-attribute-value';


/**
 * Current employment history of the person
 */
export interface UpdateEmploymentHistory { 
    /**
     * The job title of the employee
     */
    jobTitle?: string;
    /**
     * The employer name
     */
    employer?: string;
    occupation?: SimpleEnumValue;
    /**
     * The employment history is valid within a range starting with this date
     */
    validFrom?: string;
    /**
     * The employment history is valid within a range ending with this date, specified date included
     */
    validTo?: string;
    /**
     * The country code
     */
    country?: string;
    /**
     * Sector code
     */
    sectorCode?: string;
    /**
     * The dynamic attributes of the employment history to update
     */
    dynamicAttributes?: { [key: string]: SimpleDynamicAttributeValue; };
}

