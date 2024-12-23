import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreditApplication} from "../../domain/credit-retail/model/credit-application";
import {UploadApplicantCreditScoreStipulationDocumentResponse} from "../../domain/credit-retail";

export interface CreditRetailResponse {
  creditApplications: CreditApplication[];
  totalCount: number
}

export interface UploadCreditApplicantCreditScoresStipulationsDocumentsBody {
  file : File;
  description?: string
}

@Injectable({
  providedIn: 'root'
})
export class CreditRetailApiService {

  path = "/api/credit-retail/v1"

  constructor(private http: HttpClient) { }

  getCreditApplicationApi = () => this.http.get<CreditRetailResponse>(`${this.path}/credit-applications/`)

  cancelCreditApplicationApi = (creditApplicationId: string) => this.http.post<any>(`${this.path}/credit-applications/${creditApplicationId}/cancellations`, {})

  getCreditApplicationByStatusApi = (status: string) => this.http.get<CreditRetailResponse>(`${this.path}/credit-applications?credit_application_status=${status}`)

  getCreditApplicationByStatusPageableApi = (count: number, offset: number, status: string) => this.http.get<CreditRetailResponse>(`${this.path}/credit-applications?count=${count}&offset=${offset}&credit_application_status=${status}`)

  getCreditApplicationByIdApi = (creditApplicationId: string) => this.http.get<CreditApplication>(`${this.path}/credit-applications/${creditApplicationId}`)

  getCreditApplicantCreditScoreApi = (creditApplicationId: string, applicantCreditScore: string) => this.http.get<any>(`${this.path}/credit-applications/${creditApplicationId}/applicant-credit-scores/${applicantCreditScore}`)

  getCreditApplicantCreditScoresStipulationsApi = (creditApplicationId: string, applicantCreditScore: string) => this.http.get<any>(`${this.path}/credit-applications/${creditApplicationId}/applicant-credit-scores/${applicantCreditScore}/stipulations`)

  getCreditApplicantCreditScoresStipulationsDocumentsApi = (creditApplicationId: string, applicantCreditScore: string) => this.http.get<any>(`${this.path}/credit-applications/${creditApplicationId}/applicant-credit-scores/${applicantCreditScore}/stipulations/documents`)

  getCreditApplicationStipulationsApi = (creditApplicationId: string) => this.http.get<any>(`${this.path}/credit-applications/${creditApplicationId}/stipulations`)

  getCreditApplicationStipulationDocumentsApi = (creditApplicationId: string) => this.http.get<any>(`${this.path}/credit-applications/${creditApplicationId}/stipulations/documents`)

  uploadCreditApplicantCreditScoresStipulationsDocumentsApi = (
    creditApplicationId: string,
    applicantCreditScore: string,
    stipulationId: string,
    payload: UploadCreditApplicantCreditScoresStipulationsDocumentsBody
  ) => {
    const formData = new FormData();
    const {file, description} = payload
    formData.append('file', file)
    if (description) formData.append('description', description)
    const url =  `${this.path}/credit-applications/${creditApplicationId}/applicant-credit-scores/${applicantCreditScore}/stipulations/${stipulationId}/documents`
    return this.http.post<UploadApplicantCreditScoreStipulationDocumentResponse>(url, formData, {})
  }

  downloadCreditApplicantCreditScoresStipulationsDocumentApi = (creditApplicationId: string, applicantCreditScoreId: string, stipulationId: string, documentId: string) => {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', responseType : 'blob'});
    const options = { headers : headers,responseType : 'blob' as 'json'}
    return this.http.get<Blob>(`${this.path}/credit-applications/${creditApplicationId}/applicant-credit-scores/${applicantCreditScoreId}/stipulations/${stipulationId}/documents/${documentId}`, options)
  }

  deleteCreditApplicantCreditScoresStipulationsDocumentsApi = (creditApplicationId: string, applicantCreditScoreId: string, stipulationId: string, documentId: string) => this.http.delete(`${this.path}/credit-applications/${creditApplicationId}/applicant-credit-scores/${applicantCreditScoreId}/stipulations/${stipulationId}/documents/${documentId}`)

  addCreditApplicationRemark = (creditApplicationId: string, remark: string) => {
    return this.http.patch<any>(`${this.path}/credit-applications/${creditApplicationId}`, {
      dynamicAttributes: {
        remark: { value: remark }
      }
    })
  }

}
