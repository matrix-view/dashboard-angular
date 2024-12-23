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
import { InputRestrictionsResponseDataInner } from './input-restrictions-response-data-inner';


export interface InputRestrictionsResponse { 
    /**
     * A list of input restriction entries
     */
    data?: Array<InputRestrictionsResponseDataInner>;
}

