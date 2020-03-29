import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Card } from "../models/card.type";
import { Company } from "../models/company.type";
import * as _ from "lodash";

@Injectable()
export class CompanyService {
    private companies: Company[];
    constructor() {
        this.load();
    }

    getCompanies() {
        return Observable.of(this.companies)
            .delay(200);
    }

    addOrUpdateCompany(company: Company) {
        if (company.id) {
            for (let i = 0; i < this.companies.length; i++) {
                if (this.companies[i].id == company.id) {
                    this.companies[i] = company;
                    break;
                }
            }
        }
        else {
            let maxCompany = _.maxBy(this.companies, c => c.id);
            company.id = ((maxCompany && maxCompany.id) || 0) + 1;
            this.companies.push(company);
        }
        return this.save();
    }

    deleteCard(company: Company | number) {
        if (typeof company === 'number')
            this.companies = _.filter(this.companies, c => c.id !== company);
        else if (typeof company === 'object')
            this.companies = _.filter(this.companies, c => c.id !== company.id);
        return this.save();
    }

    private load() {
        this.companies = JSON.parse(localStorage.getItem('companies')) || [
            { id: 1, name: 'Survey Corps' },
            { id: 2, name: 'Dog Co.' },
            { id: 3, name: 'Jones&Jones' },
            { id: 4, name: 'Gepetto\'s Toy Store' },
            { id: 5, name: 'FOXHOUND' }
        ];
        this.save();
    }

    private save() {
        localStorage.setItem('companies', JSON.stringify(this.companies));
        return Observable.timer(200);
    }
}