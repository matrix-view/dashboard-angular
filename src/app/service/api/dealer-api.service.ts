import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  FindPendingContractStipulationsResponse
} from "../../domain/dealer/model/find-pending-contract-stipulations-response";
import {UploadApplicantCreditScoreStipulationDocumentResponse} from "../../domain/credit-retail";
import {UploadCreditApplicantCreditScoresStipulationsDocumentsBody} from "./credit-retail-api.service";
import {
  PendingContractLicensePlate,
  PendingContractRegistrationDetails,
  PendingContractVehicleDelivery
} from "../../store/credit-retail/objects";

@Injectable({
  providedIn: 'root'
})
export class DealerApiService {

  path = "/api/dealer-pos/v1"

  constructor(private http: HttpClient) { }

  //  pending-contracts

  getPendingContractsApi = () => this.http.get<any>(`${this.path}/pending-contracts`)

  getPendingContractDetailApi = (pendingContractId: string) => this.http.get<any>(`${this.path}/pending-contracts/${pendingContractId}`)

  getPendingContractDocumentsApi = (pendingContractId: string) => this.http.get<any>(`${this.path}/pending-contracts/${pendingContractId}/documents`)

  getPendingContractRegistrationDetailsVehicleApi = (pendingContractId: string) => this.http.get<PendingContractRegistrationDetails>(`${this.path}/pending-contracts/${pendingContractId}/registration-details`)

  getPendingContractVehicleDeliveryApi = (pendingContractId: string) => this.http.get<PendingContractVehicleDelivery>(`${this.path}/pending-contracts/${pendingContractId}/vehicle-deliveries`)

  updatePendingContractRegistrationDetailsVehicleApi  = (pendingContractId: string, payload: PendingContractRegistrationDetails) => this.http.patch<PendingContractRegistrationDetails>(`${this.path}/pending-contracts/${pendingContractId}/registration-details`, payload)

  updatePendingContractVehicleDeliveryApi  = (pendingContractId: string, payload: PendingContractVehicleDelivery) => this.http.patch<PendingContractRegistrationDetails>(`${this.path}/pending-contracts/${pendingContractId}/vehicle-deliveries`, payload)

  registerVehicleLicensePlateApi  = (pendingContractId: string, payload: PendingContractLicensePlate) => this.http.post<any>(`${this.path}/pending-contracts/${pendingContractId}/registration-details/license-plates`, payload)

  uploadPendingContractStipulationsDocuments  = (
    pendingContractId: string,
    stipulationId: string,
    payload: UploadCreditApplicantCreditScoresStipulationsDocumentsBody
  ) => {
    const formData = new FormData();
    const {file, description} = payload
    formData.append('file', file)
    if (description) formData.append('description', description)
    const url =  `${this.path}/pending-contracts/${pendingContractId}/stipulations/${stipulationId}/documents`
    return this.http.post<UploadApplicantCreditScoreStipulationDocumentResponse>(url, formData, {})
  }


  // pending-contracts-stipulations

  getPendingContractDetailStipulationsApi = (pendingContractId: string) => this.http.get<FindPendingContractStipulationsResponse>(`${this.path}/pending-contracts/${pendingContractId}/stipulations`)

  getPendingContractDetailStipulationsDocumentsApi = (pendingContractId: string) => this.http.get<any>(`${this.path}/pending-contracts/${pendingContractId}/stipulations/documents`)

  addPendingContractDetailStipulationsDocumentsApi = (pendingContractId: string, stipulationId: string, payload: any) => this.http.post<any>(`${this.path}/pending-contracts/${pendingContractId}/stipulations/${stipulationId}/documents`, payload)

  getPendingContractDetailStipulationsDocumentDetailApi = (pendingContractId: string, stipulationId: string, documentId: string) => this.http.get<any>(`${this.path}/pending-contracts/${pendingContractId}/stipulations/${stipulationId}/documents/${documentId}`)

  deletePendingContractDetailStipulationsDocumentsApi = (pendingContractId: string, stipulationId: string, documentId: string) => this.http.delete<any>(`${this.path}/pending-contracts/${pendingContractId}/stipulations/${stipulationId}/documents/${documentId}`)



  // pending-contracts-documents

  getPendingContractDetailDocumentsApi = (pendingContractId: string) => this.http.get<any>(`${this.path}/pending-contracts/${pendingContractId}/documents`)

  addPendingContractDetailDocumentsApi = (pendingContractId: string, payload: any) => this.http.post<any>(`${this.path}/pending-contracts/${pendingContractId}/documents`, payload)

  getPendingContractDetailDocumentDetailApi = (pendingContractId: string, documentId: string) => this.http.get<any>(`${this.path}/pending-contracts/${pendingContractId}/documents/${documentId}`)

  deletePendingContractDetailDocumentsApi = (pendingContractId: string, documentId: string) => this.http.delete<any>(`${this.path}/pending-contracts/${pendingContractId}/documents/${documentId}`)



  // pending-contracts-registration-details

  getPendingContractDetailRegistrationDetailsApi = (pendingContractId: string) => this.http.get<any>(`${this.path}/pending-contracts/${pendingContractId}/registration-details`)

  updatePendingContractDetailRegistrationDetailsApi = (pendingContractId: string, payload: any) => this.http.patch<any>(`${this.path}/pending-contracts/${pendingContractId}/registration-details`, payload)

  addPendingContractDetailRegistrationDetailsLicensePlatesApi = (pendingContractId: string, payload: any) => this.http.patch<any>(`${this.path}/pending-contracts/${pendingContractId}/registration-details/license-plates`, payload)



  // pending-contracts-purchase-invoices

  getPendingContractDetailPurchaseInvoicesApi = (pendingContractId: string) => this.http.get<any>(`${this.path}/pending-contracts/${pendingContractId}/purchase-invoices`)

  addPendingContractDetailPurchaseInvoicesApi = (pendingContractId: string, payload: any) => this.http.post<any>(`${this.path}/pending-contracts/${pendingContractId}/purchase-invoices`, payload)

  getPendingContractDetailPurchaseInvoicesDocumentsApi = (pendingContractId: string) => this.http.get<any>(`${this.path}/pending-contracts/${pendingContractId}/purchase-invoices/documents`)

  getPendingContractDetailPurchaseInvoicesDocumentDetailApi = (pendingContractId: string, purchaseInvoiceId: string, documentId: string) => this.http.get<any>(`${this.path}/pending-contracts/${pendingContractId}/purchase-invoices/${purchaseInvoiceId}/documents/${documentId}`)

  deletePendingContractDetailPurchaseInvoicesDocumentDetailApi = (pendingContractId: string, purchaseInvoiceId: string, documentId: string) => this.http.delete<any>(`${this.path}/pending-contracts/${pendingContractId}/purchase-invoices/${purchaseInvoiceId}/documents/${documentId}`)


}
