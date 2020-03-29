import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ng2-bootstrap'
import { CompanyPageComponent } from "./components/company-page/company-page.component";
import { CardPageComponent } from "./components/card-page/card-page.component";
import { BusinessCardAppComponent } from "./components/business-card-app/business-card-app.component";
import { CardService } from "./services/card.service";
import { CompanyService } from "./services/company.service";

let routes: Route[] = [
    { path: "companies", component: CompanyPageComponent },
    { path: "cards", component: CardPageComponent },
    { path: "companies/:id", component: CompanyPageComponent },
    { path: "cards/:id", component: CardPageComponent },
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpModule, CollapseModule.forRoot()],
    declarations: [BusinessCardAppComponent, CompanyPageComponent, CardPageComponent],
    exports: [],
    providers: [CardService, CompanyService],
    bootstrap: [BusinessCardAppComponent]
})
export class BusinessCardAppModule { }
