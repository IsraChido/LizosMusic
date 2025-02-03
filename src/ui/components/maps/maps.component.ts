import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
    selector: "maps-component",
    imports: [],
    standalone: true,
    templateUrl: "./maps.component.html",
    styleUrl: "./maps.component.scss",
})
export class MapsComponent implements OnChanges {
    @Input() mapsUrl?: string;
    safeMapsUrl!: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["mapsUrl"] && this.mapsUrl) {
            this.safeMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                this.mapsUrl + "&output=embed"
            );
        }
    }
}
