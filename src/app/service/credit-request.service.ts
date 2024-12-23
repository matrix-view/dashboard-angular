import {Injectable} from '@angular/core';
import {async, firstValueFrom, map} from "rxjs";
import {CreditRetailApiService} from "./api/credit-retail-api.service";
import {ContractApiService} from "./api/contract-api.service";
import {DealerApiService} from "./api/dealer-api.service";
import {QuotationApiService} from "./api/quotation-api.service";
import {CreditApplication} from "../domain/credit-retail";
import {activeStates, archivedStates} from "./mappers/credit-retail-mapper";
import {deepClone} from "../utils/common";
import {CustomerApiService} from "./api/customer-api.service";
import {
  CreditRequestState,
  CreditRetailState, FindPendingContractState, PendingContractRegistrationDetails,
  PendingContractsState
} from "../store/credit-retail/credit-retail-state";
import {PendingContract} from "../domain/dealer/model/pending-contract";
import {
  FindPendingContractStipulationsResponse
} from "../domain/dealer/model/find-pending-contract-stipulations-response";

@Injectable({
  providedIn: 'root'
})
export class CreditRequestService {

  constructor(private creditRetailService: CreditRetailApiService,
              private contractService: ContractApiService,
              private dealerService: DealerApiService,
              private quotationService: QuotationApiService,
              private customerService: CustomerApiService,
              ) { }

  getCreditRequests = async (): Promise<CreditRequestState[]> => {
    const result: CreditRequestState[] = []
    // const creditApplicationResponse = await firstValueFrom(this.creditRetailService.getCreditApplicationByStatusApi(activeStates.join(',')))
    // for (const creditApplication of creditApplicationResponse.creditApplications) {
    //   const creditApplicationId = creditApplication.creditApplicationId?? ""
    //   result.push({
    //     creditApplicationId,
    //     creditApplication
    //   })
    // }
    return result;
  }

  cancelCreditApplication = async (creditApplicationId: string): Promise<void> => firstValueFrom(this.creditRetailService.cancelCreditApplicationApi(creditApplicationId))

  fetchCreditRequestDetail = async (creditApplicationId: string,
                                                                    state: CreditRequestState[],
                                                                    pendingContractsState: PendingContractsState): Promise<CreditRetailState> => {
    const index = state.findIndex(data => data.creditApplicationId === creditApplicationId)
    const newState = deepClone(state)
    let creditRequestDetail
    if (index >= 0) {
      creditRequestDetail = await this.getCreditRequestDetail(state[index].creditApplication, pendingContractsState)
      newState[index] = creditRequestDetail
    } else {
      const creditApplication = await firstValueFrom(this.creditRetailService.getCreditApplicationByIdApi(creditApplicationId))
      creditRequestDetail = await this.getCreditRequestDetail(creditApplication, pendingContractsState)
      newState.push(creditRequestDetail)
    }
    return {
      creditRequests: newState,
      creditRequestDetail,
      salesPersonState: {
        salesPersonSelected: []
      },
      lastRefresh: new Date(),
      pendingContractsState,
    }
  }

  getPendingContract = (creditApplicationId: string, pendingContractsState: PendingContractsState): FindPendingContractState | undefined => {
    return pendingContractsState.pendingContracts.filter(c => c.creditApplication.creditApplicationId === creditApplicationId)[0]
  }


  getPendingContractsStipulations = async (creditApplicationId: string, pendingContractsState: PendingContractsState): Promise<FindPendingContractStipulationsResponse> => {
    const pendingContract = pendingContractsState.pendingContracts.filter(c => c.creditApplication.creditApplicationId === creditApplicationId)[0]
    if(!pendingContract) return { stipulations: [], totalCount: 0 }
    const pendingContractId = pendingContract.contract?.pendingContractId!
    const result = await Promise.all([
      firstValueFrom(this.dealerService.getPendingContractDetailStipulationsApi(pendingContractId))
    ])

    return result[0]
  }

  getCreditRequestDetail = async (creditApplication: CreditApplication, pendingContractsState: PendingContractsState): Promise<CreditRequestState> => {
    const creditApplicationId = creditApplication.creditApplicationId?? ""
    const result = await Promise.all([
      this.getCreditApplicants(creditApplication),
      this.getSalesQuote(creditApplication),
      this.getCustomer(creditApplication),
      this.getPendingContractsStipulations(creditApplicationId, pendingContractsState)
    ])
    let pendingContract = this.getPendingContract(creditApplicationId, pendingContractsState)
    if (!pendingContract) {
      pendingContract = {
        creditApplication: creditApplication
      }
    }
    return {
      creditApplicationId,
      creditApplication,
      creditApplicants: result[0],
      salesQuote: result[1],
      customer: result[2],
      pendingContractsStipulationState: {
        pendingContract,
        ...result[3]
      }
    };
  }

  async getCreditApplicants(creditApplication: CreditApplication) {
    const creditApplicationId = creditApplication.creditApplicationId?? ""
    const creditApplicationEntity = await firstValueFrom(this.creditRetailService.getCreditApplicationByIdApi(creditApplicationId))
    const {applicantCreditScores} = creditApplicationEntity
    const result = []
    try {
      if (applicantCreditScores && applicantCreditScores.length) {
        for (const item of applicantCreditScores) {
          const responses = await Promise.all([
            firstValueFrom(this.creditRetailService.getCreditApplicantCreditScoreApi(creditApplicationId, item.applicantCreditScoreId?? "")),
            firstValueFrom(this.creditRetailService.getCreditApplicantCreditScoresStipulationsApi(creditApplicationId, item.applicantCreditScoreId?? "")),
            firstValueFrom(this.creditRetailService.getCreditApplicantCreditScoresStipulationsDocumentsApi(creditApplicationId, item.applicantCreditScoreId?? ""))
          ])
          result.push({
            applicantCreditScoreId: item.applicantCreditScoreId,
            applicantCreditScore: responses[0],
            applicantCreditScoreStipulations: responses[1],
            applicantCreditScoreStipulationsDocuments: responses[2]
          })
        }
      }
      return result
    } catch (e) {
      console.error("Error when getting credit applicants", e)
    }
    return result
  }


  async getSalesQuote(creditApplication: CreditApplication) {
    const { salesQuote } = creditApplication
    if (salesQuote && salesQuote.salesQuoteId) {
      try {
        return await firstValueFrom(this.quotationService.getQuotationApi(salesQuote.salesQuoteId))
      } catch (e) {
        console.error("Error when getting sales quote", e)
      }
    }
    return undefined
  }

  async getCustomer(creditApplication: CreditApplication) {
    const {mainCustomer} = creditApplication
    if (mainCustomer && mainCustomer.customerId) {
      try {
        return await firstValueFrom(this.customerService.getCustomer(mainCustomer.customerId))
      } catch (e) {
        console.error("Error when getting customer", e)
      }
    }
    return undefined
  }

  getCreditRequestsArchived = async (count: number, offset: number): Promise<CreditRequestState[]> => {
    const result: CreditRequestState[] = []
    const creditApplicationResponse = await firstValueFrom(this.creditRetailService.getCreditApplicationByStatusPageableApi(
        count,
        offset,
        archivedStates.join(','))
    )
    for (const creditApplication of creditApplicationResponse.creditApplications) {
      const creditApplicationId = creditApplication.creditApplicationId?? ""
      result.push({
        creditApplicationId,
        creditApplication
      })
    }
    return result;
  }

  uploadCreditApplicantCreditScoresStipulationsDocuments = async (creditApplicationId: string,
                                                                  applicantCreditScore: string,
                                                                  stipulationId: string,
                                                                  description: string,
                                                                  file: File,
                                                                  ): Promise<any> => {

    return firstValueFrom(this.creditRetailService.uploadCreditApplicantCreditScoresStipulationsDocumentsApi(
        creditApplicationId,
        applicantCreditScore,
        stipulationId,
        { description, file }
      )
    )
  }

  uploadPendingContractStipulationsDocuments  = async (pendingContractId: string,
                                                       stipulationId: string,
                                                       description: string,
                                                       file: File,
  ): Promise<any> => {

    return firstValueFrom(this.dealerService.uploadPendingContractStipulationsDocuments(
      pendingContractId,
      stipulationId,
      { description, file }
      )
    )
  }

  downloadCreditApplicantCreditScoresStipulationsDocument = async (creditApplicationId: string,
                                                                    applicantCreditScoreId: string,
                                                                    stipulationId: string,
                                                                    documentId: string,
  ): Promise<Blob> => {
    try {
      return firstValueFrom(this.creditRetailService.downloadCreditApplicantCreditScoresStipulationsDocumentApi(
        creditApplicationId,
        applicantCreditScoreId,
        stipulationId,
        documentId,
      ))
    } catch (e: any) {
      console.error(e)
      return Promise.reject(e.message)
    }
  }


  deleteCreditApplicantCreditScoresStipulationsDocuments = async (creditApplicationId: string,
                                                                  applicantCreditScore: string,
                                                                  stipulationId: string,
                                                                  documentId: string,
  ): Promise<boolean> => {

    return firstValueFrom(this.creditRetailService.deleteCreditApplicantCreditScoresStipulationsDocumentsApi(
        creditApplicationId,
        applicantCreditScore,
        stipulationId,
        documentId
      ).pipe(
        map(() => true)
      )
    )
  }

  addCreditApplicationRemark = (creditApplicationId: string, remark: string) => {
    return firstValueFrom(this.creditRetailService.addCreditApplicationRemark(creditApplicationId, remark))
  }


  getPendingContractList = () => firstValueFrom(this.dealerService.getPendingContractsApi())

  getPendingContractDetails = async (pendingContracts: FindPendingContractState[]) => {
    for (const pendingContract of pendingContracts) {
      const pendingContractId = pendingContract.contract?.pendingContractId!
      pendingContract.pendingContractRegistrationDetailsVehicle = await this.getPendingContractRegistrationDetailsVehicle(pendingContractId)
      pendingContract.pendingContractVehicleDelivery = await this.getPendingContractVehicleDelivery(pendingContractId)
      pendingContract.pendingContractDocuments = await this.getPendingContractDocuments(pendingContractId)
    }
    return pendingContracts
  }

  getPendingContractDocuments = async (pendingContractId: string) => {
    const response = await firstValueFrom(this.dealerService.getPendingContractDocumentsApi(pendingContractId))
    return response.documents
  }

  getPendingContractRegistrationDetailsVehicle = (pendingContractId: string) => firstValueFrom(this.dealerService.getPendingContractRegistrationDetailsVehicleApi(pendingContractId))

  getPendingContractVehicleDelivery = (pendingContractId: string) => firstValueFrom(this.dealerService.getPendingContractVehicleDeliveryApi(pendingContractId))

  updatePendingContractDetail = async (payload: FindPendingContractState) => {
    const {
      contract,
      pendingContractRegistrationDetailsVehicle,
      pendingContractVehicleDelivery,
    } = payload
    if (!pendingContractRegistrationDetailsVehicle || !pendingContractVehicleDelivery) throw new Error('Required data not provided')
    const pendingContractId = contract?.pendingContractId!
    const result: any = {
      pendingContractDetail: payload
    }
    result.resultUpdatePendingContractRegistrationDetail = await this.updatePendingContractRegistrationDetail(pendingContractId, pendingContractRegistrationDetailsVehicle)
    result.resultUpdatePendingContractVehicleDeliveryApi = await firstValueFrom(this.dealerService.updatePendingContractVehicleDeliveryApi(pendingContractId, pendingContractVehicleDelivery))
    return result
  }

  updatePendingContractRegistrationDetail = async (pendingContractId: string, payload: PendingContractRegistrationDetails) => {
    const {
      vin,
      firstRegistrationDate,
      licensePlate
    } = payload
    const result: any = {}
    result.resultUpdatePendingContractRegistrationDetailsVehicle = await firstValueFrom(this.dealerService.updatePendingContractRegistrationDetailsVehicleApi(pendingContractId, {vin, firstRegistrationDate}))
    if (licensePlate) {
      result.resultUpdatePendingContractVehicleDelivery = await firstValueFrom(this.dealerService.registerVehicleLicensePlateApi(pendingContractId, licensePlate))
    }
    return result
  }


  getCreditApplicationDocuments = async (creditRequest: CreditRequestState) => {
    const result: any = [
      { name: "Contract xyz", date: "12/03/2024", },
      { name: "SEPA Document", date: "12/03/2024", },
      { name: "Delivery protocol", date: "12/03/2024", },
    ]
    const quoteId = creditRequest.salesQuote?.salesQuote.salesQuoteId
    if (quoteId) {
      const documentTemplateResponse = await firstValueFrom(this.quotationService.getQuotationDocumentTemplatesApi(quoteId))
      console.log(documentTemplateResponse)
    }

    return result
  }

}

