import { Component, OnInit } from "@angular/core";
import { NavComponent } from "../../components/nav/nav.component";
import { ReviewsComponent } from "../../components/reviews/reviews.component";
import { MapsComponent } from "../../components/maps/maps.component";
import { CartComponent } from "../../components/cart/cart.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { ActivatedRoute } from "@angular/router";
import { EventDetailed } from "@/core/domain/events/models/response/events.response";
import { GetEventsByIdUseCase } from "@/core/domain/events/usecases/getEventsById.usecase";
import { EventDetailsComponent } from "../../components/event-details/event-details.component";
import Swal from "sweetalert2";

@Component({
    selector: "app-details",
    imports: [
        NavComponent,
        ReviewsComponent,
        MapsComponent,
        CartComponent,
        CategoriesComponent,
        EventDetailsComponent,
    ],
    templateUrl: "./details.component.html",
    styleUrl: "./details.component.css",
})
export class DetailsComponent implements OnInit {
    eventDetails!: EventDetailed;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly getEventsByIdUseCase: GetEventsByIdUseCase
    ) {}

    ngOnInit(): void {
        const eventId = this.route.snapshot.paramMap.get("id");
        if (eventId) {
            this.fetchEventDetails(eventId);
        }
    }

    fetchEventDetails(eventId: string): void {
        this.getEventsByIdUseCase.execute(eventId).subscribe((response) => {
            if ("data" in response) {
                this.eventDetails = response.data;

                if (this.eventDetails.status != "published") {
                    Swal.fire({
                        title: "Evento no disponible",
                        text: "Este evento no está disponible aún, igual puede visualizarlo.",
                        icon: "info",
                        confirmButtonText: "Entendido",
                    });
                }
            } else {
                console.error("Error obteniendo eventos:", response.message);
                this.eventDetails = {} as EventDetailed;
            }
        });
    }
}
