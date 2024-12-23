/**
 * miles-quotation
 * This service supports creation, calculation and follow-up of sales quotes (price proposals), typically    involving selection/configuration of a vehicle/asset and a choice of finance or rental product.
 *
 * The version of the OpenAPI document: 4.113.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { RecalculationAttribute } from './recalculation-attribute';
import { InvoiceTarget } from './invoice-target';


export interface CalculateSalesQuoteToTargetRequest { 
    /**
     * The target lease price
     */
    targetPrice?: number;
    /**
     * Deprecated since \'4.37.0\' in favor of \'upfrontPayment\' on the \'POST /sales-quotes/{sales_quote_id}/actions/calculations\' endpoint
     */
    downPayment?: number;
    invoicingTarget?: InvoiceTarget;
    recalculationAttribute?: RecalculationAttribute;
}
export namespace CalculateSalesQuoteToTargetRequest {
}


