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
import { FindPendingContractStipulation } from './find-pending-contract-stipulation';


export interface FindPendingContractStipulationsResponse { 
    /**
     * The paginated list of pending contract stipulations
     */
    stipulations?: Array<FindPendingContractStipulation>;
    /**
     * Number of pending contract stipulations that qualify for the filters
     */
    totalCount?: number;
}

