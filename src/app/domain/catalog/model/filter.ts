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
import { MultiLanguageValue } from './multi-language-value';
import { FilterValue } from './filter-value';


/**
 * A filter
 */
export interface Filter { 
    /**
     * The ID of the filter
     */
    filterId?: string;
    description?: MultiLanguageValue;
    /**
     * A list of filter values
     */
    filterValues?: Array<FilterValue>;
}

