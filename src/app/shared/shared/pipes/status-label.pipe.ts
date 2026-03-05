import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusLabel',
  standalone: true,
})
export class StatusLabelPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    if (value === 'TO_READ') return 'Por ler';
    if (value === 'READING') return 'A ler';
    if (value === 'READ') return 'Lido';
    return value;
  }
}