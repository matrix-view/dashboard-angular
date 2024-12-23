/**
 * miles-dealer-pos
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.8.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * The recipients of the email, including the sender you are replying to
 */
export interface Recipients { 
    /**
     * The list of email addresses to which a reply on the email needs to be sent
     */
    replyTo: Array<string>;
    /**
     * The list of recipient email addresses. At least one recipient (`to`, `cc` or `bcc`) needs to be defined.
     */
    to?: Array<string>;
    /**
     * The list of CC recipient email addresses. At least one recipient (`to`, `cc` or `bcc`) needs to be defined.
     */
    cc?: Array<string>;
    /**
     * The list of BCC recipient email addresses. At least one recipient (`to`, `cc` or `bcc`) needs to be defined.
     */
    bcc?: Array<string>;
}
