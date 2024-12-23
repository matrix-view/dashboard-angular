/**
 * miles-customer
 * This service is used to retrieve information about customers, fleet managers,    drivers & legal entity groups.    It can manage all things related to UBO and its documents.    Customers can be created, updated and links to them can be removed.    The service provides filters needed to manage all these objects.
 *
 * The version of the OpenAPI document: 1.128.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Consent } from './consent';


export interface FindConsentResponse { 
    /**
     * A list of consents
     */
    consents?: Array<Consent>;
    /**
     * Use totalCount instead
     */
    totalAmount?: number;
    /**
     * The total number of consents
     */
    totalCount?: number;
}

