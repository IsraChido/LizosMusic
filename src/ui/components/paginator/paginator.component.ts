import { NgClass, NgFor } from "@angular/common";
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from "@angular/core";

@Component({
    selector: "paginator-component",
    imports: [NgFor, NgClass],
    templateUrl: "./paginator.component.html",
    styleUrl: "./paginator.component.css",
})
export class PaginatorComponent {
    @ViewChild("cardContainer") cardContainer!: ElementRef;
    @Input() totalPages: number = 0;
    @Input() currentPage: number = 1;
    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

    goToPage(page: number): void {
        this.pageChanged.emit(page);
        this.scrollToTop();
    }

    previousPage(): void {
        if (this.currentPage > 1) {
            this.pageChanged.emit(this.currentPage - 1);
            this.scrollToTop();
        }
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.pageChanged.emit(this.currentPage + 1);
            this.scrollToTop();
        }
    }

    private scrollToTop() {
        if (this.cardContainer) {
            this.cardContainer.nativeElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }
}
