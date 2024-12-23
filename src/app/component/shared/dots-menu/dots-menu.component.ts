import {Component, ElementRef, Inject, input, signal, TemplateRef, ViewChild} from '@angular/core';
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {DOCUMENT} from "@angular/common";
import { addClickOutsideListener } from '../../functions';

@Component({
  selector: 'app-dots-menu',
  standalone: true,
  imports: [
    MenuModule
  ],
  templateUrl: './dots-menu.component.html',
  styleUrl: './dots-menu.component.scss'
})
export class DotsMenuComponent {
  selected = signal<boolean>(false);
  items = input<MenuItem[]>([]);
  append = input<HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any>();
  styles = input<{[key: string]: any} | null | undefined>();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @ViewChild('section') section?: ElementRef;

  ngAfterViewInit() {
    addClickOutsideListener(this.document, 'click', (target) => {
      const isSection = this.section?.nativeElement.contains(target);
      if (!isSection && this.selected()) {
        this.selected.set(false)
      }
    })
  }

}
