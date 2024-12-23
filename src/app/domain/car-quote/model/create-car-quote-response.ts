/**
 * miles-car-quote
 * This service is used to create and copy car quotes.
 *
 * The version of the OpenAPI document: 1.74.4
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CalculateQuoteInfo } from './calculate-quote-info';
import { ConfigOptionViolation } from './config-option-violation';
import { RequestQuote } from './request-quote';
import { AllocatedDriver } from './allocated-driver';
import { QuoteViolation } from './quote-violation';


export interface CreateCarQuoteResponse { 
    quote?: RequestQuote;
    quoteViolations?: QuoteViolation;
    optionViolations?: ConfigOptionViolation;
    calculateQuoteInfo?: CalculateQuoteInfo;
    allocatedDriver?: AllocatedDriver;
    /**
     * A list of allocated drivers
     */
    allocatedDrivers?: Array<AllocatedDriver>;
    /**
     * A list of warning messages that no catalog options were found
     */
    catalogOptionsWarningMessage?: Array<string>;
}
