import {SalesQuote} from "../../domain/quotation";
import {CreditApplication} from "../../domain/credit-retail";
import {PendingContract} from "../../domain/dealer/model/pending-contract";
import {Customer} from "../../domain/customer";
import {Moment} from "moment";
import {FindPendingContract} from "../../domain/dealer/model/find-pending-contract";
import {FindPendingContractStipulation} from "../../domain/dealer/model/find-pending-contract-stipulation";
import {
  FindPendingContractStipulationsResponse
} from "../../domain/dealer/model/find-pending-contract-stipulations-response";


export interface SalesPersonState {
  salesPersonSelected: CreditApplicationsBySalesPerson[]
}


export interface CreditApplicationsBySalesPerson {
  identification: string,
  creditApplications: CreditRequestState[]
}

export interface SalesQuoteState {
  salesQuote: SalesQuote;
  calculateSalesQuoteInfo?: unknown;
  confirmSalesQuoteInfo?: unknown;
}

export interface CreditRequestState {
  creditApplicationId: string;
  creditApplication: CreditApplication;
  creditApplicants?: any[];
  salesQuote?: SalesQuoteState;
  customer?: Customer;
  pendingContractsStipulationState?: FindPendingContractStipulationsResponseState
}

export interface FindPendingContractStipulationsResponseState extends FindPendingContractStipulationsResponse {
  pendingContract: FindPendingContractState;
}

export interface CreditRetailState {
  creditRequests: CreditRequestState[],
  creditRequestDetail?: CreditRequestState,
  salesPersonState: SalesPersonState,
  pendingContractsState: PendingContractsState,
  lastRefresh?: Date,
}

export const initialState: CreditRetailState = {
  lastRefresh: new Date(),
  creditRequests: [],
  creditRequestDetail: undefined,
  salesPersonState: {
    salesPersonSelected: []
  },
  pendingContractsState: {
    pendingContracts: [],
    totalCount: 0
  },
}

export interface PendingContractsState {
  pendingContracts: FindPendingContractState[];
  totalCount: number;
}


export interface FindPendingContractState extends FindPendingContract {
  creditApplication: CreditApplication;
  pendingContractRegistrationDetailsVehicle?: PendingContractRegistrationDetails;
  pendingContractVehicleDelivery?: PendingContractVehicleDelivery;
  pendingContractDocuments?: [];
}

export interface PendingContractRegistrationDetails {
  pendingContractId?: string;
  vin?: string;
  vehicleStatus?: any;
  firstRegistrationDate?: string;
  licensePlate?: PendingContractLicensePlate;
}

export interface PendingContractLicensePlate {
  licensePlateNumber?: string;
  countryOfRegistration?: CountryReference;
  registrationDate?: string;
  registrationStatus?: any;
}

export interface CountryReference {
  countryId?: string;
  countryCodeIso2?: string;
  countryCodeIso3?: string;
  countryName?: MultiLanguageValue;
}

export interface MultiLanguageValue {
  multiLanguageId?: string;
  translation?: string;
}


export interface PendingContractVehicleDelivery {
  deliveryDate: string;
  mileageOnDelivery: number;
  deliveryConditions?: PendingContractDeliveryConditionsRequest;
}

export interface PendingContractDeliveryConditionsRequest {
  numberOfKeys?: number;
  numberOfImmobilizers?: number;
  isAccessoriesOk?: boolean;
  isDocumentsOk?: boolean;
}

export interface FindPendingContractReference {
  pendingContractId?: string;
  reference?: string;
  pendingContractStatus?: EnumValue;
  pendingContractType?: EnumValue;
}

export interface EnumValue {
  attributeTypeId?: string;
  enumGroupId?: string;
  multiLanguageId?: string;
  translation?: string;
  enabled?: boolean;
}
