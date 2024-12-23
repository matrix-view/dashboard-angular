import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  path = "/api/customer/v1"

  constructor(private http: HttpClient) { }

  getCustomer = (customerId: string) => this.http.get<any>(`${this.path}/customers/${customerId}`)

}
