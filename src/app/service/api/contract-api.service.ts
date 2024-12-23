import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContractApiService {

  path = "/api/contract/v2"

  constructor(private http: HttpClient) { }

  getContractsApi = () => this.http.get<any>(`${this.path}/contracts`)

  getContractDetailApi = (contractId: string) => this.http.get<any>(`${this.path}/contracts/${contractId}`)

  getContractDetailAttachedDocumentsApi = (contractId: string) => this.http.get<any>(`${this.path}/contracts/${contractId}/attached-documents`)

  getContractDetailPaymentScheduleApi = (contractId: string) => this.http.get<any>(`${this.path}/contracts/${contractId}/payment-schedules`)

  getContractDetailPricingDetailsApi = (contractId: string) => this.http.get<any>(`${this.path}/contracts/${contractId}/pricing-details`)

  getContractDetailDepositsApi = (contractId: string) => this.http.get<any>(`${this.path}/contracts/${contractId}/deposits`)

  getContractDetailDepositsDocumentsApi = (contractId: string, depositId: string) => this.http.get<any>(`${this.path}/contracts/${contractId}/deposits/${depositId}/documents`)

  addContractDetailDepositsDocumentsApi = (contractId: string, depositId: string, payload: any) => this.http.post<any>(`${this.path}/contracts/${contractId}/deposits/${depositId}/documents`, payload)

  getContractDetailDepositsDocumentDetailApi = (contractId: string, depositId: string, documentId: string) => this.http.get<any>(`${this.path}/contracts/${contractId}/deposits/${depositId}/documents/${documentId}`)

  getTerminationQuotesApi = () => this.http.get<any>(`${this.path}/termination-quotes`)

  addContractDetailTerminationQuotesApi = (contractId: string, payload: any) => this.http.post<any>(`${this.path}/contracts/${contractId}/termination-quotes`, payload)

  getTerminationQuoteDetailApi = (contractId: string, terminationQuoteId: any) => this.http.get<any>(`${this.path}/contracts/${contractId}/termination-quotes/${terminationQuoteId}`)

  addContractDetailTerminationQuoteCalculationsApi = (contractId: string, terminationQuoteId: any, payload: any) => this.http.post<any>(`${this.path}/contracts/${contractId}/termination-quotes/${terminationQuoteId}/calculations`, payload)

  addContractDetailTerminationQuoteCancellationsApi = (contractId: string, terminationQuoteId: any, payload: any) => this.http.post<any>(`${this.path}/contracts/${contractId}/termination-quotes/${terminationQuoteId}/cancellations`, payload)

  addContractDetailTerminationQuoteConfirmationsApi = (contractId: string, terminationQuoteId: any, payload: any) => this.http.post<any>(`${this.path}/contracts/${contractId}/termination-quotes/${terminationQuoteId}/confirmations`, payload)

}
