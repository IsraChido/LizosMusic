import { Component } from '@angular/core';

@Component({
  selector: 'modal-component',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  isModalOpen = false;
  phoneNumber: string = '';
  formattedPhoneNumber: string = '';
  creditCard: string = '';
  formattedCreditCard: string = '';

  formatPhoneNumber(event: Event): void {
    let input = (event.target as HTMLInputElement).value.replace(/\D/g, '');

    if (input.length > 3 && input.length <= 6) {
      this.formattedPhoneNumber = input.substring(0, 3) + '-' + input.substring(3);
    } else if (input.length > 6) {
      this.formattedPhoneNumber = input.substring(0, 3) + '-' + input.substring(3, 6) + '-' + input.substring(6, 10);
    } else {
      this.formattedPhoneNumber = input;
    }

    this.phoneNumber = input;
  }

  formatCreditCard(event: Event): void {
    let input = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    let formatted = '';

    for (let i = 0; i < input.length; i += 4) {
      if (i + 4 <= input.length) {
        formatted += input.substring(i, i + 4) + '-';
      } else {
        formatted += input.substring(i, i + 4);
      }
    }

    if (formatted.endsWith('-')) {
      formatted = formatted.slice(0, -1);
    }

    this.formattedCreditCard = formatted;
    this.creditCard = input;
  }
}
