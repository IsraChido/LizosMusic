import { JoinPipe } from "@/common/pipes/join-pipe.pipe";
import { EventDetailed } from "@/core/domain/events/models/response/events.response";
import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "event-details-component",
    imports: [DatePipe, JoinPipe],
    templateUrl: "./event-details.component.html",
    styleUrl: "./event-details.component.css",
})
export class EventDetailsComponent {
    @Input() event?: EventDetailed;

    imageLoadingMap: { [slug: string]: boolean } = {};

    onImageLoad(slug: string): void {
        this.imageLoadingMap[slug] = false;
    }
}
