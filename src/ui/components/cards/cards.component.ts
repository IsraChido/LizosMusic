import { JoinPipe } from "@/common/pipes/join-pipe.pipe";
import { Event } from "@/core/domain/events/models/response/events.response";
import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "cards-component",
    imports: [JoinPipe, DatePipe],
    standalone: true,
    templateUrl: "./cards.component.html",
    styleUrl: "./cards.component.scss",
})
export class CardsComponent {
    @Input() events: Event[] = [];
    imageLoadingMap: { [key: string]: boolean } = {};

    constructor(private readonly router: Router) {
        this.events.forEach((event) => {
            this.imageLoadingMap[event.slug] = true;
        });
    }

    onImageLoad(slug: string): void {
        this.imageLoadingMap[slug] = false;
    }

    navigateToDetails(eventId: number): void {
        this.router.navigate(["/details", eventId]);
    }
}
