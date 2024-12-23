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
import { DynamicAttributeValue } from './dynamic-attribute-value';
import { Bank } from './bank';
import { MultiLanguageValue } from './multi-language-value';
import { EnumValue } from './enum-value';


/**
 * Bank account
 */
export interface BankAccount { 
    /**
     * Bank account ID
     */
    bankAccountId?: string;
    /**
     * Bank account number
     */
    accountNumber?: string;
    checkType?: EnumValue;
    description?: MultiLanguageValue;
    bankAccountState?: EnumValue;
    bankAccountType?: EnumValue;
    /**
     * Bank code
     */
    bankCode?: string;
    /**
     * Customer account
     */
    customerAccount?: string;
    /**
     * Holder identification
     */
    holderIdentification?: string;
    /**
     * General ledger account ID
     */
    generalLedgerAccountId?: string;
    bank?: Bank;
    /**
     * A map of dynamic attributes
     */
    dynamicAttributes?: { [key: string]: DynamicAttributeValue; };
}
