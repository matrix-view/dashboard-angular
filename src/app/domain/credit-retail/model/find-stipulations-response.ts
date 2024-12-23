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
import { FindStipulation } from './find-stipulation';


export interface FindStipulationsResponse { 
    /**
     * The paginated list of stipulations
     */
    stipulations?: Array<FindStipulation>;
    /**
     * Number of stipulations that qualify for the filters
     */
    totalCount?: number;
}

