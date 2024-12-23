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
import { DoubleUnitValue } from './double-unit-value';
import { UpdateStatus } from './update-status';


export interface UpdateRetailMileageTermResponse { 
    /**
     * The ID of the resulting amendment quote
     */
    amendmentQuoteId?: string;
    /**
     * The ID of the resulting case
     */
    caseId?: string;
    annualMileage?: DoubleUnitValue;
    totalMileage?: DoubleUnitValue;
    /**
     * The date the changes will go in effect
     */
    changeDate?: string;
    status?: UpdateStatus;
}
export namespace UpdateRetailMileageTermResponse {
}


