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
import { SimpleEnumValue } from './simple-enum-value';
import { SimpleDynamicAttributeValue } from './simple-dynamic-attribute-value';


/**
 * Individual Person, required when legal entity is an individual or sole trader
 */
export interface IndividualPersonRequest { 
    /**
     * First name
     */
    firstName?: string;
    /**
     * Middle name
     */
    middleName?: string;
    /**
     * Maiden name
     */
    maidenName?: string;
    /**
     * Maiden middle name
     */
    maidenMiddleName?: string;
    /**
     * Maiden second last name
     */
    maidenSecondLastName?: string;
    /**
     * Last name
     */
    lastName: string;
    /**
     * Second last name
     */
    secondLastName?: string;
    /**
     * Initials
     */
    initials?: string;
    /**
     * Birth date
     */
    birthDate?: string;
    /**
     * Country
     */
    country?: string;
    /**
     * Language
     */
    language?: string;
    /**
     * The number of people dependent on the person
     */
    numberOfDependents?: number;
    /**
     * A person\'s place of birth
     */
    placeOfBirth?: string;
    /**
     * Official registration
     */
    officialRegistration?: string;
    personTitle: SimpleEnumValue;
    gender?: SimpleEnumValue;
    /**
     * A map of dynamic attributes
     */
    dynamicAttributes?: { [key: string]: SimpleDynamicAttributeValue; };
    maritalStatus?: SimpleEnumValue;
    /**
     * The country of birth code
     */
    countryOfBirth?: string;
    residencyStatus?: SimpleEnumValue;
    housingTenure?: SimpleEnumValue;
}
