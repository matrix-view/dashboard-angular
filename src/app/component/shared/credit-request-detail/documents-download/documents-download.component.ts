import {Component, input} from '@angular/core';
import {CreditRequestState} from "../../../../store/credit-retail/credit-retail-state";
import {SharedModule} from "primeng/api";
import {StatusComponent} from "../../status/status.component";
import {TableModule} from "primeng/table";
import {listHeaders} from "../../../../service/mappers/credit-retail-mapper";
import {InputIconModule} from "primeng/inputicon";
import {CreditRequestService} from "../../../../service/credit-request.service";
import {toObservable} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-documents-download',
  standalone: true,
  imports: [
    SharedModule,
    StatusComponent,
    TableModule,
    InputIconModule
  ],
  templateUrl: './documents-download.component.html',
  styleUrl: './documents-download.component.scss'
})
export class DocumentsDownloadComponent {

  creditRequest = input.required<CreditRequestState>()

  headers = [
    'Name',
    'Update date',
    ''
  ];

  data: any = [ ]

  constructor(creditRequestService: CreditRequestService) {
    toObservable(this.creditRequest).subscribe(next =>
      creditRequestService.getCreditApplicationDocuments(next).then(res => this.data = res))

  }



}
