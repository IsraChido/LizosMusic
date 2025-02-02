import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Output,
    Renderer2,
} from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "dropdown-component",
    imports: [FaIconComponent],
    templateUrl: "./dropdown.component.html",
    styleUrl: "./dropdown.component.scss",
})
export class DropdownComponent {
    faCaretDown = faCaretDown;
    filterLabel = "Sin filtro";
    selectedFilter = "sinFiltro";
    dropdownOpen = false;
    private clickListener!: () => void;

    @Output() filterChanged = new EventEmitter<string>();

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;

        if (this.dropdownOpen) {
            this.clickListener = this.renderer.listen(
                "document",
                "click",
                this.handleClickOutside.bind(this)
            );
        } else {
            if (this.clickListener) {
                this.clickListener();
            }
        }
    }

    selectFilter(filter: string): void {
        this.selectedFilter = filter;

        switch (filter) {
            case "sinFiltro":
                this.filterLabel = "Sin filtro";
                break;
            case "name":
                this.filterLabel = "Nombre del evento";
                break;
            case "tags":
                this.filterLabel = "Tags";
                break;
            case "venue.name":
                this.filterLabel = "Foro";
                break;
            case "venue.city":
                this.filterLabel = "Ciudad";
                break;
            default:
                this.filterLabel = "Sin filtro";
        }

        this.filterChanged.emit(filter);

        this.dropdownOpen = false;
    }

    handleClickOutside(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.dropdownOpen = false;

            if (this.clickListener) {
                this.clickListener();
            }
        }
    }
}
