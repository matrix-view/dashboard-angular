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
import { QuoteService } from './quote-service';
import { Rule } from './rule';


/**
 * The quote violations
 */
export interface SalesQuoteViolation { 
    /**
     * A list of missing required quote services
     */
    missingRequiredQuoteServices?: Array<QuoteService>;
    /**
     * A list of multiple instantiated quote services
     */
    multipleInstantiatedQuoteServices?: Array<QuoteService>;
    /**
     * A list of quotation template error rules
     */
    quotationTemplateErrorRules?: Array<Rule>;
    /**
     * A list of quotation template warning rules
     */
    quotationTemplateWarningRules?: Array<Rule>;
    /**
     * A list of service filter error rules
     */
    serviceFilterErrorRules?: Array<Rule>;
    /**
     * A list of service filter warning rules
     */
    serviceFilterWarningRules?: Array<Rule>;
}
