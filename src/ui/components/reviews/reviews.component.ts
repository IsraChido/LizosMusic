import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'reviews-component',
  imports: [FaIconComponent],
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faUser = faUser;
}
