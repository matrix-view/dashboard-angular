/**
 * miles-car-quote
 * This service is used to create and copy car quotes.
 *
 * The version of the OpenAPI document: 1.74.4
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * The cost of the used vehicle to be delivered
 */
export interface DeliveryCostRequest { 
    /**
     * The delivery cost of the used vehicle with VAT. You may provide only one of the two delivery costs, either the one with VAT (deliveryCostWithVat), the one without VAT (deliveryCostWithoutVat) or none
     */
    deliveryCostWithVat?: number;
    /**
     * The delivery cost of the used vehicle without VAT. You may provide only one of the two delivery costs, either the one with VAT (deliveryCostWithVat), the one without VAT (deliveryCostWithoutVat) or none
     */
    deliveryCostWithoutVat?: number;
}

