import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserManagementApiService {

  path = "/api/miles-user-management/v1"

  constructor(private http: HttpClient) { }

  getCustomer = (userId: string) => this.http.get<any>(`${this.path}/user-accounts/${userId}`)

}
