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
import { DynamicAttributeValue } from './dynamic-attribute-value';
import { MultiCurrencyValue } from './multi-currency-value';
import { VehicleDiscountConfiguration } from './vehicle-discount-configuration';
import { DoubleUnitValue } from './double-unit-value';
import { MultiLanguageValue } from './multi-language-value';
import { EnumValue } from './enum-value';
import { VehicleExtraDiscountConfiguration } from './vehicle-extra-discount-configuration';
import { Model } from './model';
import { ElectricalVehicleSpecifications } from './electrical-vehicle-specifications';
import { Make } from './make';
import { Supplier } from './supplier';
import { VehicleOptionConfiguration } from './vehicle-option-configuration';


/**
 * The car configuration
 */
export interface CarConfiguration { 
    /**
     * The ID of the quote vehicle
     */
    quoteVehicleId?: string;
    description?: MultiLanguageValue;
    /**
     * The catalog car ID
     */
    catalogCarId?: string;
    makeName?: MultiLanguageValue;
    modelName?: MultiLanguageValue;
    /**
     * Deprecated since 2022-12-19 and version 1.55.0 in favor of model.modelYear
     */
    modelYear?: string;
    /**
     * The name of the type
     */
    typeName?: string;
    consumption?: DoubleUnitValue;
    /**
     * The CO2 emission of the car
     */
    co2Emission?: number;
    /**
     * The kW of the vehicle
     */
    kW?: number;
    /**
     * The horsepower of the car
     */
    dinHp?: number;
    /**
     * The engine capacity of the car
     */
    cc?: number;
    /**
     * The code of the car
     */
    code?: string;
    engineFuelType?: EnumValue;
    /**
     * The path to the image of the car
     */
    imagesPath?: string;
    /**
     * The maximum number of seating capacity of the car
     */
    maximumSeatingCapacity?: number;
    /**
     * The seating capacity of the car
     */
    seatingCapacity?: number;
    transmission?: EnumValue;
    nature?: EnumValue;
    catalogVATCode?: EnumValue;
    powertrain?: EnumValue;
    tax?: MultiCurrencyValue;
    netPrice?: MultiCurrencyValue;
    netPriceInclVAT?: MultiCurrencyValue;
    catalogPrice?: MultiCurrencyValue;
    consumerPrice?: MultiCurrencyValue;
    /**
     * Discount percentage
     */
    discountPercentage?: number;
    discountAmount?: MultiCurrencyValue;
    discountAmountInclVAT?: MultiCurrencyValue;
    /**
     * Whether it\'s imposed by the dealer
     */
    isDealerImposed?: boolean;
    totalOptionPrice?: MultiCurrencyValue;
    /**
     * Acceleration from 0 to 100 km/h or from 0 to 60 mp/h
     */
    acceleration?: number;
    /**
     * Fiscal power is used for taxation
     */
    fiscalPower?: number;
    /**
     * The height of the car in mm
     */
    height?: number;
    /**
     * The length of the car in mm
     */
    length?: number;
    /**
     * The width of the car in mm
     */
    width?: number;
    netWeight?: DoubleUnitValue;
    /**
     * (NOx) emissions is the nitrogen oxides that a car emits in mg/km
     */
    noxEmission?: number;
    /**
     * Number of cylinders the car has
     */
    numberOfCylinders?: number;
    /**
     * The content of the tank
     */
    tankContents?: number;
    /**
     * The torque of the car in Nm
     */
    torque?: number;
    /**
     * The width of the wheelbase in mm
     */
    wheelbase?: number;
    /**
     * The specification of the tire
     */
    tireSpecification?: string;
    maxWeight?: DoubleUnitValue;
    maxLoad?: DoubleUnitValue;
    trailerLoadBraked?: DoubleUnitValue;
    trailerLoadUnbraked?: DoubleUnitValue;
    bodyStyle?: EnumValue;
    energyLabel?: EnumValue;
    emissionNorm?: EnumValue;
    drive?: EnumValue;
    numberOfDoors?: EnumValue;
    orderStrategy?: EnumValue;
    /**
     * The date when the configuration changed for the last time
     */
    configurationChangedDate?: string;
    /**
     * The date when the configuration has been validated for the last time
     */
    validationDate?: string;
    /**
     * A list of options for the vehicle
     */
    vehicleOptionConfigurations?: Array<VehicleOptionConfiguration>;
    /**
     * A list of vehicle extra discount configurations
     */
    vehicleExtraDiscountConfigurations?: Array<VehicleExtraDiscountConfiguration>;
    /**
     * A list of vehicle discount configurations
     */
    vehicleDiscountConfigurations?: Array<VehicleDiscountConfiguration>;
    supplier?: Supplier;
    /**
     * A map of dynamic attributes
     */
    dynamicAttributes?: { [key: string]: DynamicAttributeValue; };
    /**
     * Use quoteVehicleId instead
     */
    carConfigurationId?: string;
    /**
     * Use maximumSeatingCapacity instead
     */
    maximumNumberOfPassengers?: number;
    /**
     * Use seatingCapacity instead
     */
    numberOfPassengers?: number;
    make?: Make;
    model?: Model;
    electricalVehicleSpecifications?: ElectricalVehicleSpecifications;
}

