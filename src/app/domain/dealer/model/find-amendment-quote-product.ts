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
import { DynamicAttributeValue } from './dynamic-attribute-value';
import { AmendmentQuoteMileageTermInformation } from './amendment-quote-mileage-term-information';
import { Price } from './price';


/**
 * The product linked to the amendment quote
 */
export interface FindAmendmentQuoteProduct { 
    applicableLeasePrice?: Price;
    mileageAndTerm?: AmendmentQuoteMileageTermInformation;
    /**
     * The dynamic attributes of the amendment quote product
     */
    dynamicAttributes?: { [key: string]: DynamicAttributeValue; };
}

