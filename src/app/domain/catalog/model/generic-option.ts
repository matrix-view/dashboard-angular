/**
 * miles-catalog
 * This service may be used to retrieve for    makes, models, catalog vehicles and catalog options. Also generic    options can be retrieved for colors and accessories. Finally, also    vehicle images are available through this service.
 *
 * The version of the OpenAPI document: 2.35.8
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { DynamicAttributeValue } from './dynamic-attribute-value';
import { QualifierDefinition } from './qualifier-definition';
import { MultiLanguageValue } from './multi-language-value';
import { EnumValue } from './enum-value';


/**
 * An generic option that is contained by this pack
 */
export interface GenericOption { 
    /**
     * ID of the generic option
     */
    genericOptionId?: string;
    optionType?: EnumValue;
    /**
     * Available from date of the generic option
     */
    availableFrom?: string;
    /**
     * Available to date of the generic option
     */
    availableTo?: string;
    description?: MultiLanguageValue;
    /**
     * Check presence boolean of the generic option
     */
    checkPresence?: boolean;
    /**
     * Reference of the generic option
     */
    reference?: string;
    /**
     * Residual value coefficient of the generic option
     */
    residualValueCoefficient?: number;
    /**
     * Residual value percentage of the generic option
     */
    residualValuePercentage?: number;
    qualifier1?: QualifierDefinition;
    qualifier2?: QualifierDefinition;
    qualifier3?: QualifierDefinition;
    optionCategory?: EnumValue;
    /**
     * A map of dynamic attributes
     */
    dynamicAttributes?: { [key: string]: DynamicAttributeValue; };
}

