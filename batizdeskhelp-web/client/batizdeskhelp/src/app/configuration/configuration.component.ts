import { Component, Input} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConfigService } from '../services/config.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'configuration-component',
    templateUrl: 'configuration.component.html',
    styleUrls: ['configuration.component.css']
})

export class ConfigurationComponent{
    constructor(private configService:ConfigService, public snackBar: MatSnackBar){
        setTimeout(() => {
            this.green =  configService.getGreen();
            this.orange = configService.getOrange();
            this.red = configService.getRed();
            console.log(`HI ${this.green}`)
        }, 1000)
    }

    green: any;
    orange: any;
    red: any;

    updateDays() {
        this.configService.addConfig({config: 'DaysToGreen', value: this.green }).subscribe(config => {
            console.log(config)
        },
        err => console.error(err))
        this.configService.addConfig({config: 'DaysToOrange', value: this.orange }).subscribe(config => {
            console.log(config)
            let snackBarUpdateData = this.snackBar.open('Datos actualizados con éxito');
            setTimeout( () => {
                snackBarUpdateData.dismiss()
            },1500);
        },
        err => console.error(err))
        this.configService.addConfig({config: 'DaysToRed', value: this.red }).subscribe(config => {
            console.log(config)
        },
        err => console.error(err))
    }
}