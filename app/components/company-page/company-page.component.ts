import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Company } from "../../models/company.type";
import { CardService } from "../../services/card.service";
import { CompanyService } from "../../services/company.service";
import { ActivatedRoute } from "@angular/router";
import { SearchResult } from "../../models/search-result.type";
import { Card } from "../../models/card.type";
import * as _ from "lodash";

@Component({
    selector: "company-page",
    templateUrl: "./company-page.component.html"
})
export class CompanyPageComponent implements OnInit {
    constructor(private companyService: CompanyService,
        private cardService: CardService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let companyId = +params['id'];
            // TODO: get current company by ID
        });
    }
    selectedCompany: Company;
    cards: Card[];
    companies: Observable<Company[]>;
   
}