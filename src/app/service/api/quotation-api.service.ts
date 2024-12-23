import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuotationApiService {

  path = "/api/quotation/v4"

  constructor(private http: HttpClient) { }

  getQuotationApi = (quotationId: string) => this.http.get<any>(`${this.path}/sales-quotes/${quotationId}`)

  getQuotationDocumentTemplatesApi = (quotationId: string) => this.http.get<any>(`${this.path}/sales-quotes/${quotationId}/document-templates`)

}
