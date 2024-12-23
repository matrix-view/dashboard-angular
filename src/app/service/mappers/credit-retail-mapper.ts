import {deepClone, moneyFormat} from "../../utils/common";
import {CreditApplication} from "../../domain/credit-retail";
import {Buyer} from "../../domain/buyer";
import {CreditRequestState, FindPendingContractState} from "../../store/credit-retail/objects";
import {SalesQuote} from "../../domain/quotation";
import {
  QuoteInformationComponentModel
} from "../../component/shared/credit-request-detail/customer-information/quote-information/quote-information.component";
import {
  PrivatePersonModel
} from "../../component/shared/credit-request-detail/customer-information/customer-details/private-person/private-person.component";
import {
  ContactDataModel
} from "../../component/shared/credit-request-detail/customer-information/customer-details/contact-data/contact-data.component";
import {
  CompanyModel
} from "../../component/shared/credit-request-detail/customer-information/customer-details/company/company.component";
import {Customer} from "../../domain/customer";
import moment from "moment";
import {
  DynamicTable, DynamicTablePaginationEvent,
  ExcelColumn,
  StipulationDocument
} from "../../component/shared/dynamic-table/dynamic-table.component";
import {TranslateService} from "@ngx-translate/core";
import {firstValueFrom, map, Observable} from "rxjs";
import {signal, Signal} from "@angular/core";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {FindPendingContract} from "../../domain/dealer/model/find-pending-contract";
import {
  DeliveryInformationComponentModel
} from "../../component/shared/credit-request-detail/contract-delivery/delivery-information/delivery-information.component";
import {
  CreditRequestDetailActiveItem, CreditRequestDetailActiveSubItem
} from "../../component/shared/credit-request-detail/credit-request-detail.component";
import {Delivery} from "../../component/shared/ready-for-delivery/ready-for-delivery.component";


export const milesDateFormat = 'YYYY-MM-DD'
export const dateFormat = 'DD/MM/YYYY'
export const dateTimeFormat = 'DD/MM/YYYY HH:mm'

export const remarksLineBreak = '\n'

export const remarksEntry = (userName: string, remark: string) => `${moment().format(dateFormat)} ${userName}: ${remark}`;

export const listHeaders = ['REFERENCE', 'CUSTOMER', 'VEHICLE', 'PRODUCT', 'STATUS', '']

export enum LeasePriceTypes {
  DOWN_PAYMENT = "100618",
  LEASE_PRICE = "400230"
}

export const dynamicTableRowNumbersDefault = 10
export const getListPage = (list: CreditRequestState[], event?: DynamicTablePaginationEvent) => {
  let offset = 0
  if (event) {
    offset = event.first
  }
  return list.slice(offset,  offset + dynamicTableRowNumbersDefault)
}

export const CustomerType = {
  PRIVATE_PERSON: ["700"],
  COMPANY: [
    "100421",
    "200207",
    "200208",
    "200209",
    "200210",
    "200211",
    "400001",
    "400002",
    "400003",
    "400004",
    "400005",
  ],
}

export enum CreditRequestStatus {
  CREATED = "1830",
  REQUESTED = "1831",
  PENDING = "100026",
  ANSWERED = "1832",
  PRE_VALIDATED = "400015",
  COMPLETED = "2452",
  FINAL_ACCEPTANCE = "3421",
  READY_FOR_PAYOUT = "3422",
  MANUAL_UNDERWRITING = "100624",
  DATA_VALIDATION_FAILED = "3438",
  MATCHING_FAILED = "3441",
  KVK_FAILED = "3439",
  ADDRESS_VALIDATION_FAILED = "3440",
  CORRECTION_REQUIRED = "1869",
  CANCELED = "1833",
  REJECTED = "400257",
}

export enum PendingContractStatus {
  INITIALIZED = "565",
//   TODO add missing values
}


export enum StipulationStatus {
  RECEIVED = "100723",
  CREATED = "1113",
  RETURNED = "1116",
  PRE_VALIDATED = "400012",
  ACTIVE = "1114",
  REFUSE = "3663",
  CANCELED = "1827",
  CLOSED = "1115",
  USED = "1826",
  TO_BE_POSTPONED = "3423",
  POSTPONED = "3424",
}

export const getStipulationStatusByKey = (key: keyof typeof StipulationStatus) => StipulationStatus[key]

export const getStipulationStatusByValue = (value?: string) => {
  if (!value) {
    return  StipulationStatus.CLOSED
  }
  return Object.values(StipulationStatus).filter((item: string) => item === value)[0]
}

export const getCreditRequestStatusByValue = (value?: string) => {
  if (!value) {
    return  CreditRequestStatus.REJECTED
  }
  return Object.values(CreditRequestStatus).filter((item: string) => item === value)[0]
}


export const StipulationStatusGroup = {
  statusRequiresUpload: [
    StipulationStatus.CREATED,
    StipulationStatus.RETURNED,
    StipulationStatus.REFUSE,
  ],
  statusDoesNotRequireUpload: [
    StipulationStatus.USED,
    StipulationStatus.RECEIVED,
    StipulationStatus.PRE_VALIDATED,
    StipulationStatus.TO_BE_POSTPONED,
    StipulationStatus.POSTPONED,
    StipulationStatus.ACTIVE
  ],
  statusNotToBeConsidered: [
    StipulationStatus.CANCELED,
    StipulationStatus.CLOSED
  ]
}

export const pendingStates = [
  CreditRequestStatus.CREATED,
  CreditRequestStatus.REQUESTED
]

export const preApprovedStates = [
  CreditRequestStatus.PRE_VALIDATED,
  CreditRequestStatus.ANSWERED,
]

export const awaitingDeliveryStates = [
  CreditRequestStatus.COMPLETED,
  CreditRequestStatus.READY_FOR_PAYOUT,
]

export const archivedStates = [
  CreditRequestStatus.CANCELED,
  CreditRequestStatus.REJECTED,
]

export const statusAllowedToCancel = [
  ...pendingStates
]

export const activeStates = [
  ...pendingStates, ...preApprovedStates, ...awaitingDeliveryStates
]

export interface CreditRequest {
  reference: string
  customer: string
  vehicle: string
  product?: string
  status: string
  submissionDate?: string
  leasePrice?: string
  deliveryDate?: string
  durationAndDistance?: string
  otherInfo?: string
  creditApplication: CreditApplication
}

export interface StatusOverviewModel {
  title: string
  items: StatusOverviewModelItem[]
}

export interface StatusOverviewModelItem {
  total: string
  label: string
  icon: StatusOverviewModelItemIcon
  redirect?: string
}

export interface StatusOverviewModelItemIcon {
  name: string
  color: string
}

export const mapCreditRequestResponseToCreditRequest = (creditRequestState: CreditRequestState[]): CreditRequest[] =>
  creditRequestState.map(creditRequest=> {
    const { creditApplication, salesQuote, creditApplicants } = creditRequest
    const creditApplicationTypeSkipped: any = creditApplication
    const {
      status,
      vehicleDescription,
      mainCustomer,
      reference,
    } = creditApplicationTypeSkipped

    let product = undefined
    let SDocument: StipulationDocument = {total: 0, uploaded: 0}

    if (salesQuote?.salesQuote?.quoteProduct?.productConfiguration) {
      const productConfiguration = salesQuote?.salesQuote?.quoteProduct?.productConfiguration
      product = productConfiguration?.reference ?? '-'
    }

    if (creditApplicants) {
      SDocument = {
        uploaded: countApplicantCreditScoreStipulationsReceived(creditRequest),
        total: getApplicantCreditScoreStipulationsTotalCount(creditRequest)
      }
    }
    return {
      product,
      reference: reference?? "-",
      customer: mainCustomer?.tradingName?? "-",
      vehicle: vehicleDescription?.translation?? "-",
      status: status?.translation?? "-",
      submissionDate: moment(salesQuote?.salesQuote?.creationDate).format(dateFormat) ?? "-",
      leasePrice: getLeasePrice(salesQuote?.salesQuote?.quoteProduct?.productConfiguration?.priceDetails ?? []) ?? '-',
      durationAndDistance: getDurationAndDistance(salesQuote?.salesQuote?.quoteProduct) ?? '-',
      documents: SDocument,
      creditApplication: deepClone(creditApplication)
    }
  })

const getLeasePrice = (arr: any[]) => {
  const {leasePrice, leaseVat} = arr.find(priceDetail => priceDetail?.id === LeasePriceTypes.LEASE_PRICE) ?? { }
  if (!leasePrice) return '-'
  const leasePriceValue = leasePrice.value
  const leaseVatValue = leaseVat?.value?? 0
  const leasePriceValueWithVat = leasePriceValue * (leaseVatValue + 1)
  return `€ ${moneyFormat(leasePriceValue)} excl. VAT / € ${moneyFormat(leasePriceValueWithVat)} incl. VAT`
}

const getDurationAndDistance = (product: any) => {
  const {term, mileage} = product ?? {}
  return (term && mileage) ? `${term?.value} ${term?.unit?.translation} / ${mileage?.value?.toLocaleString('de-DE')} ${mileage?.unit?.translation}` : '-'
}


export function mapArchivedCreditRetailResponseToCreditRequest(creditRequestState: CreditRequestState[]): CreditRequest[] {
  return creditRequestState.map(creditRequest=> {
    const { creditApplication } = creditRequest
    const {
      status,
      vehicleDescription,
      salesQuote,
      mainCustomer,
    } = creditApplication
    return {
      reference: salesQuote?.reference?? "",
      customer: mainCustomer?.tradingName?? "",
      vehicle: vehicleDescription?.translation?? "",
      product: " - ",
      status: status?.translation?? "",
      creditApplication: deepClone(creditApplication)
    }
  })
}

const groupBy = function(xs: any, key: any) {
  return xs.reduce(function(rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

async function getStatusOverviewConfiguration(creditRequestStatus: string, translateService: TranslateService) {
  switch (creditRequestStatus) {
    case CreditRequestStatus.PENDING:
    case CreditRequestStatus.CREATED:
    case CreditRequestStatus.REQUESTED:
      return {
        icon: {
          name: 'pi pi-sync',
          color: '#F97316'
        },
        redirect: "pending",
        label: await firstValueFrom(translateService.get('PAGES.COMPONENTS.STATUS_OVERVIEW.REQUESTS.PENDING'))
      }
    case CreditRequestStatus.COMPLETED:
    case CreditRequestStatus.READY_FOR_PAYOUT:
      return {
        icon: {
          name: 'pi pi-check-circle',
          color: '#22C55E',
        },
        redirect: "approved",
        label: await firstValueFrom(translateService.get('PAGES.COMPONENTS.STATUS_OVERVIEW.REQUESTS.AWAITING_DELIVERY'))
      }
    case CreditRequestStatus.PRE_VALIDATED:
    case CreditRequestStatus.ANSWERED:
      return {
        icon: {
          name: 'pi pi-file',
          color: '#22C55E',
        },
        redirect: "pre-approved",
        label: await firstValueFrom(translateService.get('PAGES.COMPONENTS.STATUS_OVERVIEW.REQUESTS.PRE_APPROVED'))
      }
    case CreditRequestStatus.REJECTED:
    case CreditRequestStatus.CANCELED:
    case CreditRequestStatus.FINAL_ACCEPTANCE:
      return {
        icon: {
          name: 'pi pi-times-circle',
          color: '#f9164b'
        },
        redirect: "archive",
        label: await firstValueFrom(translateService.get('PAGES.COMPONENTS.STATUS_OVERVIEW.REQUESTS.ARCHIVED'))
      }
    default:
      return {
        icon: {
          name: 'pi pi-times-circle',
          color: '#f9164b'
        },
        label: '-'
      }
  }
}

async function getPendingContractsStatusOverviewConfiguration(pendingContractStatus: string, label: string) {
  switch (pendingContractStatus) {
    case PendingContractStatus.INITIALIZED:
      return {
        icon: {
          name: 'pi pi-sync',
          color: '#F97316'
        },
        label
      }
    case 'PendingContractStatus.COMPLETED':
      return {
        icon: {
          name: 'pi pi-check-circle',
          color: '#22C55E',
        },
        label
      }
    case 'PendingContractStatus.FINISHED':
      return {
        icon: {
          name: 'pi pi-car',
          color: '#22C55E',
        },
        label
      }
    case 'PendingContractStatus.CANCELED':
      return {
        icon: {
          name: 'pi pi-times-circle',
          color: '#f9164b'
        },
        label
      }
    default:
      return {
        icon: {
          name: 'pi pi-times-circle',
          color: '#f9164b'
        },
        label: '-'
      }
  }
}

export async function mapCreditRetailResponseToStatusOverviewRequests(creditRequestState: CreditRequestState[],
                                                                      translateService: TranslateService
): Promise<StatusOverviewModel> {

  const title = await firstValueFrom(translateService.get('PAGES.COMPONENTS.STATUS_OVERVIEW.REQUESTS.TITLE'))
  const mapData = []
  for(const ca of creditRequestState) {
    const status = ca.creditApplication.status
    if (!status?.enumId) {
      throw new Error('Status is mandatory')
    }
    mapData.push(await getStatusOverviewConfiguration(status.enumId, translateService))
  }
  const group = groupBy(mapData, 'label')
  const items: StatusOverviewModelItem[] = []

  Object.keys(group).map(label => {
    const arr = group[label]
    const {icon, redirect} = arr[0]
    const total = arr.length
    items.push({  icon, redirect, label, total })
  })
  return { title,  items }
}

export async function mapCreditRetailResponseToStatusOverviewContracts(findPendingContracts: FindPendingContract[],
                                                                 translateService: TranslateService): Promise<StatusOverviewModel> {
  const title = await firstValueFrom(translateService.get('PAGES.COMPONENTS.STATUS_OVERVIEW.CONTRACTS.TITLE'))
  const mapData = []
  for(const ca of findPendingContracts) {
    const status = ca.contract?.pendingContractStatus
    if (!status?.enumId) {
      throw new Error('Status is mandatory')
    }
    mapData.push(await getPendingContractsStatusOverviewConfiguration(status.enumId, status?.translation?? ''))
  }
  const group = groupBy(mapData, 'label')
  const items: StatusOverviewModelItem[] = []

  Object.keys(group).map(label => {
    const arr = group[label]
    const {icon, redirect} = arr[0]
    const total = arr.length
    items.push({  icon, redirect, label, total })
  })
  return { title,  items }
}

export function getContractDeliveryCount(data: CreditRequestState) {
  const { pendingContractsStipulationState} = data
  return pendingContractsStipulationState?.totalCount?? 0
}


export function getApplicantCreditScoreStipulationsTotalCount(data: CreditRequestState) {
  const { creditApplicants} = data
  return creditApplicants?.map(item => item.applicantCreditScoreStipulations.totalCount).reduce((a, b) => a + b, 0)
}

export function countApplicantCreditScoreStipulationsReceived(data: CreditRequestState) {
  return data.creditApplicants?.reduce((count, app) => {
    return count + app.applicantCreditScoreStipulations.stipulations.reduce((innerCount: number, st: any) => {
      return innerCount + (st.stipulationStatus.enumId === StipulationStatus.RECEIVED ? 1 : 0);
    }, 0);
  }, 0) || 0;
}

export function mapCreditPreApprovedListToPreApprovedCreditRequests(data: CreditRequestState): Buyer {
  const { creditApplicationId, creditApplication, creditApplicants } = data
  const {
    mainCustomer,
    salesQuote,
    vehicleDescription
  } = creditApplication
  let document = undefined
  if (creditApplicants) {
    document = {
      message: 'Contract documents need to be uploaded',
      quantity: `${getApplicantCreditScoreStipulationsTotalCount(data)}`
    }
  }
  return {
    creditApplicationId,
    name: mainCustomer?.legalName,
    reference: salesQuote?.reference,
    description: vehicleDescription?.translation,
    document
  }
}

export function mapSalesQuoteToQuoteInformationComponentModel(input: SalesQuote): QuoteInformationComponentModel {
    let reference = "-"
    let creationDate = "-"
    let vehicleDescription = "-"
    let licensePlate = "-"
    let duration = "-"
    let distance = "-"
    let product = "-"
    let leasePrice = "-"

    if (input?.car?.existingCarInformation?.mileage
      && input.reference
      && input.creationDate
      && input.quoteProduct) {

      const { existingCarInformation, description} = input.car
      const { mileage} = existingCarInformation
      const { term, productConfiguration, applicableLeasePrice } = input.quoteProduct

      reference = input.reference
      creationDate = input.creationDate
      product = productConfiguration?.reference ?? '-'
      vehicleDescription = description?.translation ?? ""
      licensePlate = "null"
      duration = term ? `${term.value} ${term.unit?.translation}` : ''
      distance = mileage ? `${mileage.value} ${mileage.unit?.translation}` : ''
      leasePrice = `€ ${applicableLeasePrice?.value?.value ?? 0}`
  }
  return {
    reference,
    creationDate,
    vehicleDescription,
    licensePlate,
    duration,
    distance,
    product,
    leasePrice,
  }
}


export function mapCustomerToPrivatePersonModel(customer: Customer): PrivatePersonModel {
  const { individualPerson } = customer
  let firstName = '-'
  let lastName = '-'
  let gender = '-'
  let birthDate = '-'
  if (individualPerson) {
    firstName = individualPerson.firstName?? "-"
    lastName = individualPerson.lastName?? "-"
    gender = individualPerson.gender?.translation?? "-"
    birthDate = individualPerson.birthDate?? "-"
  }
  return {
    firstName,
    lastName,
    gender,
    birthDate,
  }
}

export function mapCustomerToCompanyModel(customer: Customer): CompanyModel {
  const {
    legalName,
    legalEntity,
    taxLiability,
  } = customer
  let legalEntityModel = '-'
  let companyName = '-'
  let vatNumber = '-'
  let vatLiabilityModel = '-'

  if (legalName
    && legalEntity
    && taxLiability) {
      legalEntityModel = legalEntity?.translation?? '-'
      companyName = legalName
      vatNumber = 'null'
      vatLiabilityModel = taxLiability?.translation?? '-'
  }
  return {
    legalEntity: legalEntityModel,
    companyName,
    vatNumber,
    vatLiability: vatLiabilityModel,
  };
}

export function mapCustomerToContactDataModel(customer: Customer): ContactDataModel {
  const {
    phoneNumbers,
    addresses,
    internetReferences,
  } = customer
  let phoneNumber1 = '-'
  let phoneNumber2 = '-'
  let addressLine1 = '-'
  let addressLine1Nr = '-'
  let postalCode = '-'
  let city = '-'
  let country = '-'
  let email = '-'

  if (phoneNumbers) {
    const phone1 = phoneNumbers[0]
    const phone2 = phoneNumbers[1]
    if (phone1) {
      phoneNumber1 = phone1.formattedPhoneNumber?? '-'
    }
    if (phone2) {
      phoneNumber2 = phone2.formattedPhoneNumber?? '-'
    }
  }

  if (addresses && addresses.length && addresses[0].address) {
    const {address} = addresses[0]
    addressLine1 = address.addressLine1?.translation?? "-"
    addressLine1Nr = address.addressLine1Nr?.translation?? "-"
    postalCode = address.postalCode?? "-"
    city = address.city?.translation?? "-"
    country = address.country?.countryCodeIso2?? "-"
  }

  if (internetReferences && internetReferences.length && internetReferences[0].url) {
    email = internetReferences[0].url
  }

  return {
    phoneNumber1,
    phoneNumber2,
    addressLine1,
    addressLine1Nr,
    postalCode,
    city,
    country,
    email,
  }
}


export const setDynamicTable = (arr: any[], translate: TranslateService) => {
  return new Observable<DynamicTable>(subscriber => {
    Promise.all([
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.REFERENCE')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.CUSTOMER_NAME')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.SALES_PERSON')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.PRODUCT')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.STATUS')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.DOCUMENTS')),

      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.DETAIL.VEHICLE')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.DETAIL.SUBMISSION_DATE')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.DETAIL.LEASE_PRICE')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.DETAIL.DURATION_DISTANCE')),

    ]).then((data) => {
      subscriber.next(new DynamicTable(
        [
          { header: data[0], field: 'reference' },
          { header: data[1], field: 'customer' },
          { header: data[2], alias: 'salesPerson', field: 'creditApplication.brokerContact.identification', avatar: true },
          { header: data[3], field: 'product' },
          { header: data[4], field: 'status' },
          { header: data[5], field: 'documents'}
        ],
        arr,
        {
          lines: [
            {
              items: [
                { label: data[6], value: 'vehicle' },
                { label: data[7], value: 'submissionDate' },
                { label: data[8], value: 'leasePrice' },
              ]
            },
            {
              items: [
                { label: data[9], value: 'durationAndDistance' },
              ]
            }
          ]
        },
      ))
    })
  })
}

export const excelColumns = [
  { column: 'Reference', field: 'reference' },
  { column: 'Customer', field: 'customer' },
  { column: 'Sales Person', field: 'creditApplication.brokerContact.identification' },
  { column: 'Product', field: 'product' },
  { column: 'Status', field: 'status' },
  { column: 'Documents', field: 'documents', func: (v: StipulationDocument) => `${v.uploaded} / ${v.total} documents uploaded` },
  { column: 'Vehicle', field: 'vehicle' },
  { column: 'Submission Date', field: 'submissionDate' },
  { column: 'Lease Price', field: 'leasePrice', func: (v: string) => withTrim(v.split('/')[0]) },
  { column: 'Lease VAT', field: 'leasePrice', func: (v: string) => withTrim(v.split('/')[1]) },
  { column: 'Expected delivery date', field: '' },
  { column: 'Duration', field: 'durationAndDistance', func: (v: string) => withTrim(v.split('/')[0]) },
  { column: 'Distance', field: 'durationAndDistance', func: (v: string) => withTrim(v.split('/')[1]) },
  { column: 'Other Info', field: '' },
] as ExcelColumn[]

const withTrim = (s: string) => {
  if (s) {
    return s.trim()
  }
  return '-'
}


export const getCreditRequestRemarks = (creditRequest: CreditRequestState) => {
  let result: string[] = []
  const dynamicAttributes = creditRequest.creditApplication.dynamicAttributes
  if (dynamicAttributes && dynamicAttributes['remarks']) {
    result = String(dynamicAttributes['remarks'].value?? '').split(remarksLineBreak)
  }
  return result
}


const i18nToResult = async (translateService: TranslateService, keys: string[])=> {
  const result: any = {}
  const i18n = await Promise.all(keys.map(key => firstValueFrom(translateService.get(key))))
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = i18n[i]
  }
}

export const buildCreditRequestTranslationConfig = async (translateService: TranslateService) => {
  const basePath = 'PAGES.CREDIT_REQUEST_DETAIL.SUBTITLE'
  return await i18nToResult(translateService,
    [
      `${basePath}.CUSTOMER_INFORMATION`,
      `${basePath}.PAYMENT_PLAN`,
      `${basePath}.DOCUMENTS_DOWNLOAD`,
      `${basePath}.DOCUMENTS_UPLOAD`,
      `${basePath}.CREDIT_REQUEST`,
      `${basePath}.CONTRACT_AND_DELIVERY`,
  ])
}

export const buildCreditRequestCustomerInformationTranslationConfig = async (translateService: TranslateService) => {
  const basePath = 'PAGES.CREDIT_REQUEST_DETAIL.QUOTE_INFORMATION'
  return await i18nToResult(translateService,
    [
      `${basePath}.CUSTOMER_TYPE.PRIVATE_PERSON`,
      `${basePath}.CUSTOMER_TYPE.COMPANY`,
    ])
}


export const mapCreditRequestStateToDeliveryInformationComponentModel = (creditRequestState: CreditRequestState) => {
  const result: any = {
    pendingContract: {},
    pendingContractRegistrationDetailsVehicle: {},
    pendingContractVehicleDelivery: { deliveryDate: '', mileageOnDelivery: 0 },
  }

  const {pendingContractsStipulationState} = creditRequestState
  if (pendingContractsStipulationState) {
    const {
      pendingContractRegistrationDetailsVehicle,
      pendingContractVehicleDelivery
    } = pendingContractsStipulationState.pendingContract
    result.pendingContract = pendingContractsStipulationState.pendingContract
    result.pendingContractRegistrationDetailsVehicle = pendingContractRegistrationDetailsVehicle || result.pendingContractRegistrationDetailsVehicle
    result.pendingContractVehicleDelivery = pendingContractVehicleDelivery || result.pendingContractVehicleDelivery
  }

  return result
}


export const mapCreditRequestStateToLicensePlate = (creditRequestState: CreditRequestState) => {

  const {pendingContractsStipulationState} = creditRequestState
  if (pendingContractsStipulationState) {
    const deliveryInformation: any = mapCreditRequestStateToDeliveryInformationComponentModel(creditRequestState)
    const {pendingContractRegistrationDetailsVehicle} = deliveryInformation
    return pendingContractRegistrationDetailsVehicle.licensePlate?.licensePlateNumber
  }
  return undefined
}

export const mapCreditRequestStateToDelivery = (pendingContractState: FindPendingContractState[], creditRequestState: CreditRequestState[]): Delivery[] => {
  const result: Delivery[] = []
  for (const data of pendingContractState) {
    const {pendingContractRegistrationDetailsVehicle} = data
    const plate = pendingContractRegistrationDetailsVehicle?.licensePlate?.licensePlateNumber
    if (plate) {
      const creditRequest = findCreditRequestById(creditRequestState, data.creditApplication.creditApplicationId!)
      const name = creditRequest.customer?.legalName?? `-`
      const route = `protected/pending-requests/detail/${data.creditApplication.creditApplicationId}/${CreditRequestDetailActiveItem.CONTRACT_DELIVERY}/${CreditRequestDetailActiveSubItem.CONTRACT_DELIVERY_VEHICLE}`
      result.push({ name, plate, route })
    }
  }
  return result
}

export const findCreditRequestById = (creditRequestState: CreditRequestState[], creditApplicationId: string) => creditRequestState.filter(c => c.creditApplicationId === creditApplicationId)[0]

export const verifyCreditApplicationIsAllowedToCancel = (creditApplication: CreditApplication) => statusAllowedToCancel.includes(getCreditRequestStatusByValue(creditApplication.status?.enumId?? ''))
