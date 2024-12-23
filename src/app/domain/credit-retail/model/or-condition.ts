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
import { AndConditionAndInner } from './and-condition-and-inner';


export interface OrCondition { 
    /**
     * The conditions to combine with the OR logical operator, an empty list of conditions evaluates to FALSE
     */
    or?: Array<AndConditionAndInner>;
}

