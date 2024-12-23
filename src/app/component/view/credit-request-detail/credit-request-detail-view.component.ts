import {Component, computed, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CreditRetailStore} from "../../../store/credit-retail/credit-retail-state";
import {JsonPipe} from "@angular/common";
import {
  CreditRequestDetailActiveItem, CreditRequestDetailActiveSubItem,
  CreditRequestDetailComponent
} from "../../shared/credit-request-detail/credit-request-detail.component";
import {CreditRequestService} from "../../../service/credit-request.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-credit-request-detail-view',
  standalone: true,
  imports: [
    JsonPipe,
    CreditRequestDetailComponent,
    RouterLink,
    ProgressSpinnerModule
  ],
  templateUrl: './credit-request-detail-view.component.html',
  styleUrl: './credit-request-detail-view.component.scss'
})
export class CreditRequestDetailViewComponent implements OnInit, OnDestroy {

  id = ""
  activeItem = CreditRequestDetailActiveItem.CUSTOMER_INFORMATION
  activeSubItem = CreditRequestDetailActiveSubItem.PENDING_CONTRACT_STIPULATION
  creditRetailStore = inject(CreditRetailStore)

  creditApplicationDetail = computed<any>(() => {
    const {creditRequestDetail} = this.creditRetailStore;
    if (creditRequestDetail) {
      return  creditRequestDetail();
    }
    else return undefined
  })

  state = {
    creditApplicationDetail: {}
  }

  constructor(private route: ActivatedRoute,
              private service: CreditRequestService,
              ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? ""
    this.getActiveItem()
    this.creditRetailStore.getCreditApplicationDetail(this.service, this.id)
  }

  getActiveItem() {
    const activeItemParam = Number(this.route.snapshot.paramMap.get('activeItem')?? '0')
    const activeSubItem = Number(this.route.snapshot.paramMap.get('activeSubItem')?? '0')
    const activeItemKey = isNaN(activeItemParam) ? 0 : activeItemParam
    switch (activeItemKey) {
      case 0:
        this.activeItem = CreditRequestDetailActiveItem.CUSTOMER_INFORMATION
        break
      case 1:
        this.activeItem = CreditRequestDetailActiveItem.PAYMENT_PLAN
        break
      case 2:
        this.activeItem = CreditRequestDetailActiveItem.DOCUMENTS_DOWNLOAD
        break
      case 3:
        this.activeItem = CreditRequestDetailActiveItem.DOCUMENTS_UPLOAD_CREDIT_REQUEST
        break
      case 4:
        this.activeItem = CreditRequestDetailActiveItem.CONTRACT_DELIVERY
        break
      default:
        this.activeItem = CreditRequestDetailActiveItem.CUSTOMER_INFORMATION
        break
    }
    switch (activeSubItem) {
      case 0:
        this.activeSubItem = CreditRequestDetailActiveSubItem.PENDING_CONTRACT_STIPULATION
        break
      case 1:
        this.activeSubItem = CreditRequestDetailActiveSubItem.CONTRACT_DELIVERY_VEHICLE
        break
      default:
        break
    }
  }

  ngOnDestroy(): void {
    this.creditRetailStore.clearCreditApplicationDetail()
  }

  get creditRequest() {
    return this.creditApplicationDetail()?.creditApplication
  }

  get salesQuote() {
    return this.creditRequest?.salesQuote
  }

  get mainCustomer() {
    return this.creditRequest?.mainCustomer
  }

  get title() {
    return this.salesQuote?.reference
    && this.mainCustomer?.legalName ? `${this.salesQuote?.reference} - ${this.mainCustomer?.legalName}` : ''
  }

}
