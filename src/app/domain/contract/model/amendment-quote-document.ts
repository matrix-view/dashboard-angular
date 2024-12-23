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
import { MultiLanguageValue } from './multi-language-value';


/**
 * Amendment quote document
 */
export interface AmendmentQuoteDocument { 
    /**
     * The ID of the document
     */
    documentId?: string;
    /**
     * The ID of the amendment quote
     */
    amendmentQuoteId?: string;
    /**
     * The ID of the contract
     */
    contractId?: string;
    name?: MultiLanguageValue;
    /**
     * The ID of the document type
     */
    documentType?: string;
    description?: MultiLanguageValue;
    documentTemplateName?: MultiLanguageValue;
    /**
     * The date the document was created
     */
    createdAt?: string;
}
