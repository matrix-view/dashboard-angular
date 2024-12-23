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
import { FindPendingContractPurchaseInvoice } from './find-pending-contract-purchase-invoice';


export interface FindPendingContractPurchaseInvoicesResponse { 
    /**
     * The paginated list of pending contract purchase invoices
     */
    purchaseInvoices?: Array<FindPendingContractPurchaseInvoice>;
    /**
     * Number of pending contract purchase invoices that qualify for the filters
     */
    totalCount?: number;
}

