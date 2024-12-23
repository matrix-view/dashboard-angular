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
import { DynamicAttributeValue } from './dynamic-attribute-value';
import { MultiCurrencyValue } from './multi-currency-value';
import { BikeOption } from './bike-option';
import { MultiLanguageValue } from './multi-language-value';
import { EnumValue } from './enum-value';
import { BikeOptionPack } from './bike-option-pack';


/**
 * The bike, it can only return a bike or a car not both
 */
export interface Bike { 
    /**
     * The ID of the bike
     */
    bikeId?: string;
    description?: MultiLanguageValue;
    /**
     * The chassis number of the bike
     */
    chassisNumber?: string;
    /**
     * First registration date
     */
    firstRegistrationDate?: string;
    /**
     * License plate of the bike
     */
    licensePlate?: string;
    /**
     * Model year of the bike
     */
    modelYear?: string;
    /**
     * The size of the frame
     */
    frameSize?: string;
    /**
     * The color of the bike
     */
    color?: string;
    /**
     * The wheel type of the bike
     */
    wheelType?: string;
    /**
     * The amount of gears the bike has
     */
    gears?: string;
    /**
     * Indicates whether the bike has a lock included
     */
    lockStandard?: boolean;
    lockPrice?: MultiCurrencyValue;
    /**
     * The extra info
     */
    extraInfo?: string;
    makeName?: MultiLanguageValue;
    modelName?: MultiLanguageValue;
    /**
     * The name of the type
     */
    typeName?: string;
    frameType?: EnumValue;
    fleetVehicleStatus?: EnumValue;
    vehicleCategory?: EnumValue;
    vehicleNature?: EnumValue;
    /**
     * A list of bike options
     */
    bikeOptions?: Array<BikeOption>;
    /**
     * A list of bike option packs
     */
    bikeOptionPacks?: Array<BikeOptionPack>;
    totalOptionPrice?: MultiCurrencyValue;
    /**
     * A map of dynamic attributes
     */
    dynamicAttributes?: { [key: string]: DynamicAttributeValue; };
}

