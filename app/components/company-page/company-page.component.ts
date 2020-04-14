import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Company } from "../../models/company.type";
import { CardService } from "../../services/card.service";
import { CompanyService } from "../../services/company.service";
import { ActivatedRoute } from "@angular/router";
import { SearchResult } from "../../models/search-result.type";
import { Card } from "../../models/card.type";
import * as _ from "lodash";
import { of } from "rxjs/observable/of";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
    selector: "company-page",
    templateUrl: "./company-page.component.html"
})
export class CompanyPageComponent implements OnInit {
    constructor(private companyService: CompanyService,
        private cardService: CardService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.cardService.getCards()
            .subscribe(cards => this.cards = cards.results);
        this.route.params.subscribe(params => {
            let companyId = +params['id'];
            this.companyService.getCompanies()
                .subscribe(companies => {
                    this.originalCompany = companies.filter(c => c.id === companyId)[0];
                    if (this.originalCompany != undefined)
                        this.selectedCompany = { ...this.originalCompany };
                    this.companies = of(companies);
                });
        });
    }

    createCompany(company: Company) {
        company.id = undefined;
        this.saveCompany(company);
    }

    selectCompany(company: Company) {
        this.originalCompany = company;
        this.selectedCompany = { ...this.originalCompany }; // make a copy of the object
    }

    getCompanies() {
        this.companies = this.companyService.getCompanies();
    }

    saveCompany(company: Company) {
        this.companyService.addOrUpdateCompany(company)
            .subscribe(() => {
                this.getCompanies();
                this.selectedCompany = undefined;
            });
    }

    getCardCount(id: number): number {
        return this.cards.filter(card => card.companyId == id).length;
    }

    originalCompany: Company;
    selectedCompany: Company;
    cards: Card[];
    companies: Observable<Company[]>;
   
}