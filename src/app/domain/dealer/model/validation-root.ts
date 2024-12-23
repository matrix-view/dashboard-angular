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
import { ValidationPath } from './validation-path';
import { AbstractCondition } from './abstract-condition';


export interface ValidationRoot { 
    /**
     * The ISO language code of the fallback language for the error message. The language code should have been defined in the `supportedLanguages` set.
     */
    defaultLanguage?: string;
    /**
     * A not empty set of supported languages
     */
    supportedLanguages?: Set<string>;
    /**
     * All the validation paths
     */
    root?: { [key: string]: ValidationPath; };
    /**
     * All the conditions used in the validations
     */
    conditions?: { [key: string]: AbstractCondition; };
}

