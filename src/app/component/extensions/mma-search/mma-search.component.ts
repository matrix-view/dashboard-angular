import {Component, OnInit} from '@angular/core';

import {DropdownModule} from "primeng/dropdown";
import {FormControl, FormGroup} from "@angular/forms";
import {AutoCompleteModule} from "primeng/autocomplete";
import {PaginatorModule} from "primeng/paginator";

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-mma-search',
  standalone: true,
  imports: [
    AutoCompleteModule,
    DropdownModule,
    PaginatorModule
  ],
  templateUrl: './mma-search.component.html',
  styleUrl: './mma-search.component.scss'
})
export class MmaSearchComponent implements OnInit {


  items: any[] | undefined;

  selectedItem: any;

  suggestions: any[] | undefined;
  cities: City[] | undefined;


  formGroup: FormGroup | undefined;


  ngOnInit() {

    this.formGroup = new FormGroup({
      selectedCity: new FormControl<City | null>(null)
    });
  }

  search(event: AutoCompleteCompleteEvent) {
    this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }


}
