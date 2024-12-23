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


export interface CalculateTerminationQuoteRequest { 
    /**
     * The new change date on the quote. Use termination date instead.
     */
    changeDate?: string;
    /**
     * The new termination date on the quote.
     */
    terminationDate?: string;
    /**
     * The current mileage reading on the vehicle today
     */
    mileage?: number;
}
