/**
 * miles-customer
 * This service is used to retrieve information about customers, fleet managers,    drivers & legal entity groups.    It can manage all things related to UBO and its documents.    Customers can be created, updated and links to them can be removed.    The service provides filters needed to manage all these objects.
 *
 * The version of the OpenAPI document: 1.128.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { InternetReferenceUpdateRequest } from './internet-reference-update-request';
import { ContactAddressUpdateRequest } from './contact-address-update-request';
import { PhoneNumberUpdateRequest } from './phone-number-update-request';
import { SimpleEnumValue } from './simple-enum-value';
import { SimpleDynamicAttributeValue } from './simple-dynamic-attribute-value';


export interface UpdateSiteRequest { 
    /**
     * Name of the site
     */
    name?: string;
    /**
     * Reference of the site
     */
    reference?: string;
    siteType?: SimpleEnumValue;
    /**
     * A list of addresses
     */
    addresses?: Array<ContactAddressUpdateRequest>;
    /**
     * A list of phone numbers
     */
    phoneNumbers?: Array<PhoneNumberUpdateRequest>;
    /**
     * A list of internet references
     */
    internetReferences?: Array<InternetReferenceUpdateRequest>;
    /**
     * A map of dynamic attributes
     */
    dynamicAttributes?: { [key: string]: SimpleDynamicAttributeValue; };
}

