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
import { PaymentPreference } from './payment-preference';
import { BankAccount } from './bank-account';


export interface RetailBankAccountResponse { 
    bankAccount?: BankAccount;
    paymentPreference?: PaymentPreference;
}

