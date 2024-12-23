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
import { EnumValue } from './enum-value';


export interface M2MUploadApplicantCreditScoreStipulationDocumentResponse { 
    /**
     * The stipulation ID of the uploaded stipulation
     */
    stipulationId?: string;
    /**
     * The list of IDs of uploaded documents
     */
    documentIds?: Array<string>;
    stipulationStatus?: EnumValue;
}

