import {Customer} from "../../domain/customer";
import {deepClone, groupBy} from "../../utils/common";
import {
  CreditApplicationsBySalesPerson,
  CreditRequestState,
  CreditRetailState,
  FindPendingContractState,
  SalesQuoteState
} from "./objects";
import moment from "moment";
import {CreditRequestStatus} from "../../service/mappers/credit-retail-mapper";


export const updateRefreshDataState = (state: CreditRetailState) => {
  state.lastRefresh = new Date()
  return state
}

export const updateContractsDetailState = (state: CreditRetailState, response: FindPendingContractState[]) => {
  state.pendingContractsState = deepClone({
    pendingContracts: response,
    totalCount: response.length
  })
  return deepClone(state)
}

export const updateCreditRequestState = (state: CreditRetailState,
                                  creditApplicationId: string,
                                  creditApplicants?: any[],
                                  salesQuote?: SalesQuoteState,
                                  customer?: Customer
) => {
  const {creditRequests} = state
  const index = creditRequests.findIndex(item => item.creditApplicationId === creditApplicationId)
  if (index > -1) {
    const newState = deepClone(creditRequests)
    const entity = newState[index]
    if (creditApplicants) entity.creditApplicants = creditApplicants
    if (salesQuote) entity.salesQuote = salesQuote
    if (customer) entity.customer = customer
    newState[index] = entity
    state.creditRequests = newState
  }
  return state
}


export const addApplicantStipulationsDocumentsState = (state: CreditRetailState,
                                                       creditApplicationId: string,
                                                       applicantCreditScore: string,
                                                       stipulationId: string,
                                                       documentId: string,
                                                       documentName: string,
                                                       description: string,
                                                  ) => {
  const {creditRequests} = state
  const index = creditRequests.findIndex(item => item.creditApplicationId === creditApplicationId)
  if (index === -1) return creditRequests

  const creditRequestState: CreditRequestState = creditRequests[index]
  const creditApplicantState = creditRequestState.creditApplicants?.filter(item => item.applicantCreditScoreId === applicantCreditScore)[0]
  if (creditApplicantState) {
    const applicantCreditScoreStipulationsDocuments = creditApplicantState.applicantCreditScoreStipulationsDocuments?? {
      documents: []
    }
    applicantCreditScoreStipulationsDocuments.documents.push(buildApplicantStipulationsDocuments(
      stipulationId,
      documentId,
      documentName,
      description,
    ))
  }
  state.creditRequestDetail = creditRequestState
  return deepClone(state)
}


export const addPendingContractApplicantStipulationsDocumentsState = (state: CreditRetailState,
                                                                      pendingContractId: string,
                                                                      stipulationId: string,
                                                                      documentId: string,
                                                                      documentName: string,
                                                                      description: string,
) => {
  const {pendingContractsState} = state
  const index = pendingContractsState.pendingContracts.findIndex(item => item.contract?.pendingContractId === pendingContractId)
  if (index === -1) return pendingContractsState.pendingContracts

  const findPendingContractState: FindPendingContractState = pendingContractsState.pendingContracts[index]
  // TODO finish
  //
  // const creditApplicantState = findPendingContractState.creditApplicants?.filter(item => item.applicantCreditScoreId === applicantCreditScore)[0]
  // if (creditApplicantState) {
  //   const applicantCreditScoreStipulationsDocuments = creditApplicantState.applicantCreditScoreStipulationsDocuments?? {
  //     documents: []
  //   }
  //   applicantCreditScoreStipulationsDocuments.documents.push(buildApplicantStipulationsDocuments(
  //     stipulationId,
  //     documentId,
  //     documentName,
  //     description,
  //   ))
  // }
  // state.creditRequestDetail = creditRequestState
  alert('Check functions.105')
  return deepClone(state)
}


const buildApplicantStipulationsDocuments = (
  stipulationId: string,
  documentId: string,
  documentName: string,
  description: string,
) => {
  return {
    "stipulationId": stipulationId,
    "documentId": documentId,
    "fileType": "application/pdf",
    "creationDate": moment().format('DD/MM/YYYY'),
    "name": {
      "translation": documentName
    },
    "description": {
      "translation": description
    },
    "documentStatus": {
      "enumId": "1696",
      "attributeTypeId": "410",
      "multiLanguageId": "34088",
      "translation": "Klaar" // TODO i18n
    }
  }
}



export const removeApplicantStipulationsDocumentsState = (state: CreditRetailState,
                                                  creditApplicationId: string,
                                                  applicantCreditScore: string,
                                                  documentId: string,
) => {
  const {creditRequests} = state
  const index = creditRequests.findIndex(item => item.creditApplicationId === creditApplicationId)
  if (index > -1) {
    const creditRequestState: CreditRequestState = creditRequests[index]
    const creditApplicantState = creditRequestState.creditApplicants?.filter(item => item.applicantCreditScoreId === applicantCreditScore)[0]
    if (creditApplicantState) {
      const applicantCreditScoreStipulationsDocuments = creditApplicantState.applicantCreditScoreStipulationsDocuments?? []
      creditApplicantState.applicantCreditScoreStipulationsDocuments.documents = applicantCreditScoreStipulationsDocuments.documents.filter((item: any) => item.documentId !== documentId)
    }
    state.creditRequestDetail = creditRequestState
  }
  return deepClone(state)
}


export const updateCreditApplicationDynamicAttribute = (state: CreditRetailState,
                                                        creditApplicationId: string,
                                                        dynamicAttributes: any) => {
  const {creditRequests} = state
  const index = creditRequests.findIndex(item => item.creditApplicationId === creditApplicationId)
  if (index > -1) {
    const creditRequestState: CreditRequestState = creditRequests[index]
    creditRequestState.creditApplication.dynamicAttributes = dynamicAttributes
    if (state.creditRequestDetail?.creditApplication) {
      state.creditRequestDetail.creditApplication.dynamicAttributes = dynamicAttributes
    }
  }
  return deepClone(state)
}


export function groupCreditApplicationsBySalesPerson(creditApplications: CreditRequestState[]): CreditApplicationsBySalesPerson[] {
  const result: CreditApplicationsBySalesPerson[] = []
  const map = creditApplications.map(creditRequest => {
    return {
      identification: creditRequest.creditApplication.brokerContact?.identification,
      creditRequest
    }
  })
  const group = groupBy(map, 'identification')
  Object.keys(group).forEach((key: string) => {
    const items  = group[key].map((data: any) => data.creditRequest)
    result.push({
      identification: key,
      creditApplications: items
    })
  })
  return result
}


export function getCreditRequestsBySalesPerson(creditRequests: CreditRequestState[], salesPersonSelected: CreditApplicationsBySalesPerson[]) {
  return creditRequests.filter(creditRequest => {
    const salesPersonIdentification = creditRequest.creditApplication.brokerContact?.identification
    if (!salesPersonIdentification) return false

    return salesPersonSelected.some(salesPerson => salesPerson.identification === salesPersonIdentification)
  })
}

export function setSalesPersonSelected(state: CreditRetailState, salesPersonSelected: CreditApplicationsBySalesPerson[]) {
  state.salesPersonState.salesPersonSelected = salesPersonSelected
  return deepClone(state)
}

export function updateCanceledCreditApplication(state: CreditRetailState, creditApplicationId: string) {
  const {creditRequests} = state
  const index = creditRequests.findIndex(item => item.creditApplicationId === creditApplicationId)
  if (index > -1) {
    const creditRequestState: CreditRequestState = creditRequests[index]
    if (creditRequestState.creditApplication.status) creditRequestState.creditApplication.status.enumId = CreditRequestStatus.CANCELED
  }
  return deepClone(state)
}
