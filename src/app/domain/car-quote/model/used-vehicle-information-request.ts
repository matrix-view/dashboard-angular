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
import { SimpleEnumValue } from './simple-enum-value';
import { SalesPriceRequest } from './sales-price-request';
import { DeliveryCostRequest } from './delivery-cost-request';


/**
 * Information about the used vehicle to make a sales quote for
 */
export interface UsedVehicleInformationRequest { 
    /**
     * The date on which the used vehicle is first registered
     */
    firstRegistrationDate: string;
    /**
     * The chassis number of the used vehicle
     */
    chassisNumber?: string;
    /**
     * The date when this vehicle was configured. You need to fill this property in when it\'s different from firstRegistrationDate. By default the value firstRegistrationDate will be used if this property is not filled in.
     */
    configurationDate?: string;
    /**
     * The current mileage of the used vehicle
     */
    mileage: number;
    /**
     * The requested delivery date for the used vehicle
     */
    requestedDeliveryDate?: string;
    /**
     * The description of the used vehicle
     */
    description?: string;
    salesPrice: SalesPriceRequest;
    deliveryCost?: DeliveryCostRequest;
    nature?: SimpleEnumValue;
}

