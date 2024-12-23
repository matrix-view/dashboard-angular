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
import { MultiLanguageValue } from './multi-language-value';


/**
 * Language
 */
export interface Language { 
    /**
     * The ID of the language
     */
    languageId?: string;
    /**
     * The reference of the language
     */
    reference?: string;
    /**
     * The description of the language
     */
    description?: string;
    translatedDescription?: MultiLanguageValue;
    /**
     * Language code
     */
    languageCodeIso2?: string;
    /**
     * Language code
     */
    languageCodeIso3?: string;
}

