// TODO: Feature Componetized like CrisisCenter
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeroService }  from '../hero.service';
import { Hero } from '../hero';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
    heroes$: Observable<Hero[]>;
    selectedId: number;

    constructor(
        private service: HeroService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.heroes$ = this.route.paramMap.pipe(
            switchMap(params => {
                // (+) before `params.get()` turns the string into a number
                console.log('*** selected id : ', params.get('id'));
                console.log('*** get heroes: ', this.service.getHeroes());
                this.selectedId = +params.get('id');
                return this.service.getHeroes();
            })
        );

        console.log('*** the heroes$', this.heroes$);
    }
}