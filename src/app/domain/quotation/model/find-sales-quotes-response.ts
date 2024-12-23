/**
 * miles-quotation
 * This service supports creation, calculation and follow-up of sales quotes (price proposals), typically    involving selection/configuration of a vehicle/asset and a choice of finance or rental product.
 *
 * The version of the OpenAPI document: 4.113.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { FindSalesQuote } from './find-sales-quote';
import { EnumValue } from './enum-value';


export interface FindSalesQuotesResponse { 
    /**
     * A list of sales quotes
     */
    salesQuotes?: Array<FindSalesQuote>;
    /**
     * Number of sales quotes that qualify for the filters
     */
    totalCount?: number;
    /**
     * A map of dynamic attributes
     */
    applicableEnumerations?: { [key: string]: Array<EnumValue>; };
}

