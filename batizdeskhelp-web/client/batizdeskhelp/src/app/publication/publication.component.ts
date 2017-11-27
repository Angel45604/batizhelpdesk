import { Component, Input } from '@angular/core';

@Component({
    selector: 'publication-component',
    templateUrl: 'publication.component.html',
    styleUrls: ['publication.component.css']
})

export class PublicationComponent{
    header="Publication";
    admin="false";

    @Input('status')status:number;
}