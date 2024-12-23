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
import { FindContractTerminationQuote } from './find-contract-termination-quote';


export interface FindContractTerminationQuotesResponse { 
    /**
     * A list of contract termination quotes
     */
    contractTerminationQuotes?: Array<FindContractTerminationQuote>;
    /**
     * The number of contract termination quotes to be displayed
     */
    totalCount?: number;
}

