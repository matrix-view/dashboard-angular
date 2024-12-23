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
import { MultiCurrencyValue } from './multi-currency-value';
import { SimpleEnumValue } from './simple-enum-value';
import { SimpleDynamicAttributeValue } from './simple-dynamic-attribute-value';


/**
 * Loan information of the customer linked to the applicant credit score that needs to be updated and/or created
 */
export interface UpdateLoanInfo { 
    /**
     * The ID of the loan info. Disclaimer: updating fields on this object will cause the ID to change.
     */
    loanInfoId?: string;
    loanType?: SimpleEnumValue;
    /**
     * The number of the contract linked to the loan
     */
    contractNumber?: string;
    principal?: MultiCurrencyValue;
    outstandingAmount?: MultiCurrencyValue;
    monthlyInstallment?: MultiCurrencyValue;
    /**
     * Indicates whether the loan info should be removed. Note that the loan info ID needs to be provided in combination with this parameter.
     */
    isDeleted?: boolean;
    /**
     * The dynamic attributes of the loan info object that need to be added, updated or removed
     */
    dynamicAttributes?: { [key: string]: SimpleDynamicAttributeValue; };
}
