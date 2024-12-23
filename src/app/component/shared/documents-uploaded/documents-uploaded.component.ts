import {Component, input} from '@angular/core';
import {ProgressBarModule} from "primeng/progressbar";
import {SharedModule} from "primeng/api";

@Component({
  selector: 'app-documents-uploaded',
  standalone: true,
    imports: [
        ProgressBarModule,
        SharedModule
    ],
  templateUrl: './documents-uploaded.component.html',
  styleUrl: './documents-uploaded.component.scss'
})
export class DocumentsUploadedComponent {
  total = input(0)
  uploaded = input(0)
  completedColor = input('#0EA5E9')

  getPercentage(total: number, uploaded: number) {
    return (uploaded / total) * 100
  }

  changeColorWhenCompleted(total: number, uploaded: number, completedColor: string) {
    return total === uploaded ? completedColor : '';
  }
}
