import {Component, input} from '@angular/core';

@Component({
  selector: 'app-label-value',
  standalone: true,
  imports: [],
  templateUrl: './label-value.component.html',
  styles: `
    @use '../../../../assets/themes/mytheme/variables' as *;
    @use '../../../../styles/mixins.scss' as *;

    .label {
      @include set-font(16px, 300, $mma-v-black50);
    }

    .value {
      @include set-font(16px, 600);
    }
  `
})
export class LabelValueComponent {
  label = input<string>()
  value = input<string>()
  styles = input<{[key: string]: string} | null | undefined>()
}
