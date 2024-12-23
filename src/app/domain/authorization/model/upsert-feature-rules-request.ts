/**
 * miles-authorization
 * This service is used to get, set and verify feature rules, as well as self-registration templates.    For more information, check the **Read Me** tab.
 *
 * The version of the OpenAPI document: 1.20.4
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UpsertFeatureRule } from './upsert-feature-rule';


export interface UpsertFeatureRulesRequest { 
    /**
     * The list of feature rules to create and/or update
     */
    featureRules?: Array<UpsertFeatureRule>;
}

