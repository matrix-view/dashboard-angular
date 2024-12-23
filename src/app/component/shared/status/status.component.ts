import {Component, input} from '@angular/core';

@Component({
  selector: 'app-status',
  standalone: true,
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  warning = input(false, {
    transform: (value: boolean|string) => typeof value === 'string' ? value === '' : value,
  });

  danger = input(false, {
    transform: (value: boolean|string) => typeof value === 'string' ? value === '' : value,
  })

  info = input(false, {
    transform: (value: boolean|string) => typeof value === 'string' ? value === '' : value,
  })

  success = input(false, {
    transform: (value: boolean|string) => typeof value === 'string' ? value === '' : value,
  })

  label = input<string>();
  icon = input<string>();

}
