import { Reviews } from "@/core/domain/events/models/response/events.response";
import { NgFor } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import {
    faStar,
    faStarHalfAlt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "reviews-component",
    imports: [FaIconComponent, NgFor],
    standalone: true,
    templateUrl: "./reviews.component.html",
    styleUrl: "./reviews.component.scss",
})
export class ReviewsComponent {
    faStar = faStar;
    faStarHalfAlt = faStarHalfAlt;
    faUser = faUser;

    @Input() reviews: Reviews | undefined;

    getStars(rating: number): any[] {
        let stars = [];
        let fullStars = Math.floor(rating);
        let i = 0;

        while (i < fullStars) {
            stars.push(this.faStar);
            i++;
        }

        return stars;
    }
}
