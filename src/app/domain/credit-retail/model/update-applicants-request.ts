/**
 * miles-credit-retail
 * This functional service supports the creation and follow-up of **credit applications**.    For more information, check the **Read Me** tab.
 *
 * The version of the OpenAPI document: 1.29.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UpdateApplicant } from './update-applicant';


export interface UpdateApplicantsRequest { 
    /**
     * Applicants to update on the credit application
     */
    applicants: Array<UpdateApplicant>;
}

