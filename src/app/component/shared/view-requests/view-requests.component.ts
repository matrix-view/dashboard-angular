import {AfterViewInit, Component, computed, inject, signal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {OverlayModule} from "primeng/overlay";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {CheckboxModule} from "primeng/checkbox";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BadgeModule} from "primeng/badge";
import {Checkbox} from "../../objects";
import {FilterService} from "primeng/api";
import {CreditRetailStore} from "../../../store/credit-retail/credit-retail-state";
import {JsonPipe} from "@angular/common";
import {toObservable} from "@angular/core/rxjs-interop";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-view-requests',
  standalone: true,
  imports: [
    ButtonModule,
    OverlayModule,
    CardModule,
    DividerModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ScrollPanelModule,
    CheckboxModule,
    ReactiveFormsModule,
    BadgeModule,
    JsonPipe,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './view-requests.component.html',
  styleUrl: './view-requests.component.scss'
})
export class ViewRequestsComponent implements AfterViewInit {

  selectedValues: string[] = [];
  selectAllCheckboxes: boolean = true;

  creditRetailStore = inject(CreditRetailStore)

  salesPersons = computed<Checkbox[]>(() => this.creditRetailStore
    .salesPerson()
    .map(salesPerson => {
      return {
        value: salesPerson.identification,
        label: salesPerson.identification,
      }
    }))

  filteredItems = signal<Checkbox[] | undefined>([]);
  overlayVisible = signal(false)
  counter = signal(String(0))

  constructor(private fb: FormBuilder, private filterService: FilterService) {
    toObservable(this.salesPersons).subscribe(value => this.filteredItems.set(value))
    this.filterService.register('filter-requests', this.filterCheckboxes)
  }

  filterCheckboxes = (item: any, filter: any):boolean => {
    if (filter === undefined || filter === null || filter.trim() === '') {
      return true;
    }
    if (item === undefined || item === null) {
      return false;
    }
    return item.label.includes(filter.toString());
  }

  toggle() {
    this.overlayVisible.set(!this.overlayVisible());
  }

  apply() {
    this.counter.set(String(this.selectedValues.length));
    this.creditRetailStore.changeSalesPersonSelected(this.selectedValues.map(item => {
      return this.creditRetailStore.salesPerson().filter( sp => sp.identification === item)[0]
    }))
  }

  toggleAll(event:any) {
    if (!event.checked) {
      this.selectedValues = []
      return
    }
    this.selectedValues = this.salesPersons().map(item => item.value)
  }

  uncheckAll() {
    this.selectedValues = []
    this.selectAllCheckboxes = false
    this.creditRetailStore.changeSalesPersonSelected([])
    this.counter.set('0')
  }

  hiddenBadge() {
    return this.counter() === '0';
  }

  applyFilter(event:any) {
    const filteredItems = this.salesPersons()?.filter(item => {
      return this.filterCheckboxes(item, event.target.value)
    });
    this.filteredItems.set(filteredItems as Checkbox[])
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.selectedValues = this.salesPersons().map(item => item.value)
      this.counter.set(`${this.selectedValues.length}`)
    }, 1000)
  }

  onSalesPersonValueChange() {
    this.selectAllCheckboxes = !this.salesPersons().some(sp => !this.selectedValues.includes(sp.value))
  }

}
