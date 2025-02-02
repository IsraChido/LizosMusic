import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
    imports: [RouterModule, NgxSpinnerComponent],
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {}
