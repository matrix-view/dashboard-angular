/**
 * miles-user-management
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.12.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface SortBy { 
    key?: string;
    order?: SortBy.OrderEnum;
}
export namespace SortBy {
    export type OrderEnum = 'ASC' | 'DESC';
    export const OrderEnum = {
        Asc: 'ASC' as OrderEnum,
        Desc: 'DESC' as OrderEnum
    };
}


