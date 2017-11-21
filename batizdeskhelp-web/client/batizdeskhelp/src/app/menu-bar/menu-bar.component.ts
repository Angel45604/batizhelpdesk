import { Component, Input} from '@angular/core';

@Component({
    selector: 'menu-bar-component',
    templateUrl: 'menu-bar.component.html',
    styleUrls: ['menu-bar.component.css']
})

export class MenubarComponent{
    constructor(){}
    @Input('header') header: string;
    logOut(){
        location.reload();
    }
}