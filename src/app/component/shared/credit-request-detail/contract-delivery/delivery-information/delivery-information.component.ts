import {Component, inject, input} from '@angular/core';
import {
  CreditRequestState,
  EnumValue, FindPendingContractReference,
  FindPendingContractState, FindPendingContractStipulationsResponseState,
  PendingContractRegistrationDetails, PendingContractVehicleDelivery
} from "../../../../../store/credit-retail/objects";
import {CreditRequestService} from "../../../../../service/credit-request.service";
import {toObservable} from "@angular/core/rxjs-interop";
import {CreditRetailStore} from "../../../../../store/credit-retail/credit-retail-state";
import {AppMessageService, MessageType} from "../../../../../service/app-message.service";
import {ButtonModule} from "primeng/button";
import {JsonPipe} from "@angular/common";
import {CreditApplication} from "../../../../../domain/credit-retail";
import {
  dateFormat,
  mapCreditRequestStateToDeliveryInformationComponentModel, milesDateFormat
} from "../../../../../service/mappers/credit-retail-mapper";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import moment from "moment/moment";
import {CalendarModule} from "primeng/calendar";


export interface DeliveryInformationComponentModel {
  pendingContract: FindPendingContractState
  vin: string
  licensePlateNumber: string
  mileageOnDelivery: string
  deliveryDate: string
  ott: string
}

@Component({
  selector: 'app-delivery-information',
  standalone: true,
  imports: [
    ButtonModule,
    JsonPipe,
    InputGroupModule,
    InputTextModule,
    FormsModule,
    CalendarModule
  ],
  templateUrl: './delivery-information.component.html',
  styleUrl: './delivery-information.component.scss'
})
export class DeliveryInformationComponent {

  private creditRetailStore = inject(CreditRetailStore)
  creditRequest = input.required<CreditRequestState>()

  dataModel: DeliveryInformationComponentModel = {
    pendingContract: {
      creditApplication: {},
    },
    vin: '',
    licensePlateNumber: '',
    mileageOnDelivery: '',
    deliveryDate: '',
    ott: ''
  }

  constructor(private creditRequestService: CreditRequestService, public appMessageService: AppMessageService) {
    toObservable(this.creditRequest).subscribe(next => {
      const {
        pendingContractRegistrationDetailsVehicle,
        pendingContractVehicleDelivery,
        pendingContract
      } = mapCreditRequestStateToDeliveryInformationComponentModel(next)
      this.dataModel = {
        pendingContract,
        vin: pendingContractRegistrationDetailsVehicle.vin?? '',
        licensePlateNumber: pendingContractRegistrationDetailsVehicle.licensePlate?.licensePlateNumber?? '',
        mileageOnDelivery: String(pendingContractVehicleDelivery.mileageOnDelivery?? 0),
        deliveryDate: pendingContractVehicleDelivery.deliveryDate?? '',
        ott: '' // TODO verify
      }
    })
  }

  async saveChanges() {
    try {
      this.updateDataModel()
      this.creditRetailStore.updatePendingContractDetail(this.creditRequestService, this.dataModel)
      this.appMessageService.addMessage(MessageType.SUCCESS, "Information updated", '')
    } catch (e) {
      console.log(e)
      this.appMessageService.addMessage(MessageType.ERROR, "Document Upload", 'Error when uploading documents')
    }
  }

  private updateDataModel() {
    const pendingContract = this.dataModel.pendingContract
    if (pendingContract.pendingContractRegistrationDetailsVehicle) {
      const pendingContractRegistrationDetailsVehicle: any =  pendingContract.pendingContractRegistrationDetailsVehicle
      pendingContractRegistrationDetailsVehicle.vin = this.dataModel.vin
      if (this.dataModel.licensePlateNumber !== pendingContractRegistrationDetailsVehicle.licensePlate.licensePlateNumber) {
        const registrationDate = pendingContractRegistrationDetailsVehicle.licensePlateNumber?? moment()
        pendingContractRegistrationDetailsVehicle.licensePlate = {
          licensePlateNumber: this.dataModel.licensePlateNumber,
          countryOfRegistration: "NL",
          registrationDate: moment(registrationDate).format(milesDateFormat)
        }
      } else {
        pendingContractRegistrationDetailsVehicle.licensePlate = undefined
      }
    }
  }

  cancel() {
    const next = this.creditRequest()
    const {
      pendingContractRegistrationDetailsVehicle,
      pendingContractVehicleDelivery,
      pendingContract
    } = mapCreditRequestStateToDeliveryInformationComponentModel(next)
    this.dataModel = {
      pendingContract,
      vin: pendingContractRegistrationDetailsVehicle.vin?? '',
      licensePlateNumber: pendingContractRegistrationDetailsVehicle.licensePlate?.licensePlateNumber?? '',
      mileageOnDelivery: String(pendingContractVehicleDelivery.mileageOnDelivery?? 0),
      deliveryDate: pendingContractVehicleDelivery.deliveryDate?? '',
      ott: '' // TODO verify
    }
  }

}
