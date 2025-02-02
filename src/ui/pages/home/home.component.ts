import {
    Component,
    ElementRef,
    OnInit,
    signal,
    ViewChild,
} from "@angular/core";
import { NavComponent } from "../../components/nav/nav.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
import { CardsComponent } from "../../components/cards/cards.component";
import { GetEventsUseCase } from "../../../core/domain/events/usecases/getEvents.usecase";
import { Event } from "@/core/domain/events/models/response/events.response";
import { PaginatorComponent } from "../../components/paginator/paginator.component";

@Component({
    selector: "app-home",
    imports: [
        NavComponent,
        SearchBarComponent,
        DropdownComponent,
        CardsComponent,
        PaginatorComponent,
    ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
    @ViewChild("cardsSection") cardsSection!: ElementRef;

    events = signal<Event[]>([]);
    totalPages: number = 0;
    currentPage: number = 1;
    search: string = "";
    selectedFilter: string = "";

    constructor(private readonly getEventsUseCase: GetEventsUseCase) {}

    ngOnInit(): void {
        this.getEventsUseCase.execute().subscribe((response) => {
            if ("data" in response) {
                this.events.set(response.data);
                this.totalPages = response.meta.totalPages;
            } else {
                console.error("Error fetching events:", response.message);
                this.events.set([]);
            }
        });
    }

    fetchEvents(): void {
        const params: { q: string; field: string; page: number } = {
            q: this.search,
            page: this.currentPage,
            field: this.selectedFilter,
        };

        if (this.selectedFilter && this.selectedFilter !== "sinFiltro") {
            params.field = this.selectedFilter;
        }

        this.getEventsUseCase.execute(params).subscribe((response) => {
            if ("data" in response) {
                this.events.set(response.data);
                this.totalPages = response.meta.totalPages;
            } else {
                console.error("Error fetching events:", response.message);
                this.events.set([]);
            }
        });
    }

    onPageChanged(page: number): void {
        this.currentPage = page;
        this.fetchEvents();
        this.scrollToCards();
    }

    onSearchQuery(query: string): void {
        this.search = query;
        this.currentPage = 1;
        this.fetchEvents();
    }

    onFilterChanged(filter: string): void {
        if (filter == "sinFiltro") {
            this.selectedFilter = "";
        } else {
            this.selectedFilter = filter;
        }
    }

    private scrollToCards() {
        if (this.cardsSection) {
            this.cardsSection.nativeElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }
}
