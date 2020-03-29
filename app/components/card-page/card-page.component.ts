import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Card } from "../../models/card.type";
import { CardService } from "../../services/card.service";
import { SearchResult } from "../../models/search-result.type";
import { CompanyService } from "../../services/company.service";
import { Company } from "../../models/company.type";
import * as _ from "lodash";

@Component({
    selector: "card-page",
    templateUrl: "./card-page.component.html"
})
export class CardPageComponent implements OnInit {
    companies: Company[];
    selectedCard: Card;
    originalCard: Card;
    editing: boolean = false;
    cards: Observable<SearchResult<Card>>;
    currentPage: number = 0;
    maxPages: number = 0;
    searchTerm: string = "";

    constructor(private cardService: CardService, private companyService: CompanyService) { }

    ngOnInit() {
        this.getCards();
        this.companyService.getCompanies().subscribe(cmp => this.companies = cmp);
    }

    getCards() {
        this.cards = this.cardService.getCards({ 
            page: this.currentPage, 
            searchTerm: this.searchTerm });
        this.cards.subscribe(r => {
            this.maxPages = Math.ceil(r.allResults / 5);
            this.currentPage = r.page;
        });
    }
    
    getCompanyName(id: number) {
        let company = _.find(this.companies || [], c => c.id == id);
        return company && company.name;
    }

    editCard() {
        this.editing = true;
        this.originalCard = this.selectedCard;
        this.selectedCard = { ...this.originalCard }; // make a copy of the object
    }

    saveCard(card: Card) {
        this.cardService.addOrUpdateCard(card)
            .subscribe(() => {
                this.editing = false;
                this.getCards();
                this.selectedCard = undefined;
                this.originalCard = undefined;
            });
    }
    
    cancel() {
        this.editing = false;
        this.selectedCard = this.originalCard;
        this.originalCard = undefined;
    }

    confirmDelete() {
        if (confirm(`Are you sure you want to delete card for 
            ${this.selectedCard.firstName} ${this.selectedCard.lastName}?`)) {
            this.cardService.deleteCard(this.selectedCard.id).subscribe(() => {
                this.editing = false;
                this.getCards();
                this.selectedCard = undefined;
                this.originalCard = undefined;
            });
        }
    }  
}