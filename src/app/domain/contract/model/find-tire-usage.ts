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
import { EnumValue } from './enum-value';


/**
 * Tire usage
 */
export interface FindTireUsage { 
    serviceType?: EnumValue;
    maximumAllowed?: number;
    actualUsed?: number;
}

