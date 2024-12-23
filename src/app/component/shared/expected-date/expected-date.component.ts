import {Component, input} from '@angular/core';
import moment from "moment";
import {dateFormat} from "../../../utils/common";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-expected-date',
  standalone: true,
  imports: [
    OverlayPanelModule,
    NgClass
  ],
  templateUrl: './expected-date.component.html',
  styleUrl: './expected-date.component.scss'
})
export class ExpectedDateComponent {

  date = input.required<string>()
  warnMonths = input(0)
  warnMessage = input('')

  get dateAsString() {
    return this.dateAsMoment.format(dateFormat)
  }

  get dateAsMoment() {
    return moment(this.date(), dateFormat)
  }

  get isDateValid() {
    if (!this.warnMonths()) return true
    return this.dateAsMoment.isAfter(moment().add(this.warnMonths(), 'months'))
  }

  showWarning(op: any, target: any, show: boolean) {
    if (!this.isDateValid) {
      op.toggle(show, target)
    }
  }

}
