/**
 * miles-credit-retail
 * This functional service supports the creation and follow-up of **credit applications**.    For more information, check the **Read Me** tab.
 *
 * The version of the OpenAPI document: 1.29.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * A conditional validation rule
 */
export interface ConditionalValidation { 
    /**
     * When this condition evaluates to true, the field should apply to the validation
     */
    _condition?: string;
    /**
     * The validation condition to which this field should apply, when the condition evaluates to true
     */
    _validation?: string;
    /**
     * The custom error message in case the property validation is not correct. The property names will be an ISO 639-2 language code.
     */
    _validationErrorMessage?: { [key: string]: string; };
}

