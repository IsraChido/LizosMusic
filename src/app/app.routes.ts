import { Route } from "@angular/router";
import { HomeComponent } from "../ui/pages/home/home.component";
import { DetailsComponent } from "../ui/pages/details/details.component";

export const appRoutes: Route[] = [
    { path: "", component: HomeComponent },
    { path: "details/:id", component: DetailsComponent },
];
