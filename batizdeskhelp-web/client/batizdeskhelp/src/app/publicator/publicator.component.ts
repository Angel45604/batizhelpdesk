import { Component} from '@angular/core';

@Component({
    selector: 'publicator-component',
    templateUrl: 'publicator.component.html',
    styleUrls: ['publicator.component.css']
})

export class PublicatorComponent{
    constructor(){}

    areas = [
        {value: 'Area-0', viewValue: 'Area1'},
        {value: 'Area-1', viewValue: 'Area2'},
        {value: 'Area-2', viewValue: 'Area3'}
      ];
}