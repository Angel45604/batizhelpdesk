import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Config } from '../models/config'
import { map } from 'rxjs/operators';


@Injectable()
export class ConfigService implements OnInit {
     constructor (private http: Http) {
        this.getConfigs().then(configs => {
            console.log(configs)
            for(let config of configs) {
                if(config.config == 'DaysToGreen') {
                    console.log(config)
                    this.daysToGreen = config.value;
                }
                if(config.config == 'DaysToOrange') {
                    console.log(config)
                    this.daysToOrange = config.value;
                }
                if(config.config == 'DaysToRed') {
                    console.log(config)
                    this.daysToRed = config.value;
                }
            }
            console.log(`GREEN: ${this.daysToGreen} YELLOW: ${this.daysToOrange} RED: ${this.daysToRed}`)
        },
        err => console.error(err))
     }

     public daysToGreen;
     public daysToOrange;
     public daysToRed;
     
     private Configs: Config[];

     private statusurl='http://localhost:3000/api/config';   

     getGreen() {
         return this.daysToGreen;
     }
     getOrange() {
         return this.daysToOrange;
     }
     getRed() {
         return this.daysToRed;
     }

     getConfigs(){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') });
         return this.http.get(this.statusurl, {headers: headers})
                         .pipe(map((res:Response) => res.json())).toPromise()
        
     }  

     addConfig (body: Object){
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.statusurl, body, {headers: headers}) // ...using post request
                         .pipe(map((res:Response) => res.json())) // ...and calling .json() on the response to return data
    }

    removeConfig (config: string){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+sessionStorage.getItem('id_token') });
        return this.http.delete(`${this.statusurl}/${config}`, {headers: headers}) // ...using put request
                         .pipe(map(res => res )) // ...now we return data
    }

    ngOnInit() {
        

    }
}