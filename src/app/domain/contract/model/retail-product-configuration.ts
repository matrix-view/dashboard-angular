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
import { Service } from './service';
import { ProductPricingDetail } from './product-pricing-detail';


/**
 * The configuration of the retail contract product
 */
export interface RetailProductConfiguration { 
    /**
     * The reference of the retail product configuration
     */
    reference?: string;
    /**
     * Type ID of the product
     */
    productTypeId?: string;
    /**
     * A list of services
     */
    services?: Array<Service>;
    /**
     * A list of product pricing details
     */
    priceDetails?: Array<ProductPricingDetail>;
}

