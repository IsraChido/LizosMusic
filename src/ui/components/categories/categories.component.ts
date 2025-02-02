import { CurrencyPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'categories-component',
  imports: [FaIconComponent, NgClass, CurrencyPipe],
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  faTicket = faTicket;
}
