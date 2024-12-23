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
import { DynamicAttributeValue } from './dynamic-attribute-value';
import { ApplicantType } from './applicant-type';
import { ApplicantCreditScoreStipulationModel } from './applicant-credit-score-stipulation-model';
import { ApplicantInformation } from './applicant-information';


/**
 * An applicant credit score linked to the credit application
 */
export interface ApplicantCreditScoreModel { 
    /**
     * The ID of the applicant credit score
     */
    applicantCreditScoreId?: string;
    applicantType?: ApplicantType;
    /**
     * The dynamic attributes of the applicant credit score
     */
    dynamicAttributes?: { [key: string]: DynamicAttributeValue; };
    applicantInformation?: ApplicantInformation;
    /**
     * The list of stipulations linked to the applicant credit score
     */
    stipulations?: Array<ApplicantCreditScoreStipulationModel>;
}
export namespace ApplicantCreditScoreModel {
}


