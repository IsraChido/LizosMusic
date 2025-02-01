import { Component } from "@angular/core";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchComponent } from "../../components/search/search.component";

@Component({
    selector: "app-home",
    imports: [NavbarComponent, SearchComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css",
})
export class HomeComponent {}