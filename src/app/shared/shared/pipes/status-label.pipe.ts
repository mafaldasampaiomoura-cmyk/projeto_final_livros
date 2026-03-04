import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusLabel',
  standalone: true
})
export class StatusLabelPipe implements PipeTransform {

  transform(status: string): string {

    if (status === 'READ') return 'Lido';
    if (status === 'READING') return 'A ler';
    if (status === 'TO_READ') return 'Por ler';

    return status;
  }

}