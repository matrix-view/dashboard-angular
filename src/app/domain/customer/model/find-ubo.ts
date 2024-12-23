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
import { FindPerson } from './find-person';
import { EnumValue } from './enum-value';
import { PEP } from './pep';
import { UBOContact } from './ubo-contact';


/**
 * UBO
 */
export interface FindUBO { 
    /**
     * The ID of the deposit
     */
    depositId?: string;
    /**
     * The validity date until of the UBO
     */
    validToDate?: string;
    depositType?: EnumValue;
    contact?: UBOContact;
    person?: FindPerson;
    politicallyExposedPerson?: PEP;
}
