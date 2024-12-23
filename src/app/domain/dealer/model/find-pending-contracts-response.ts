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
import { FindPendingContract } from './find-pending-contract';


export interface FindPendingContractsResponse { 
    /**
     * The paginated list of pending contracts
     */
    pendingContracts?: Array<FindPendingContract>;
    /**
     * Number of pending contracts that qualify for the filters
     */
    totalCount?: number;
}

