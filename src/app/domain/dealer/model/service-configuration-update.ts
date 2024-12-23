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
import { ServiceUpdate } from './service-update';


/**
 * The changes that need to be applied to the services of the pending contract via an amendment quote
 */
export interface ServiceConfigurationUpdate { 
    /**
     * A list of services to update on the pending contract via the amendment quote
     */
    services?: Array<ServiceUpdate>;
}

