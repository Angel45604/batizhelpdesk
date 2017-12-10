import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Problem } from '../models/problem'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConfigService {
    constructor () {}

    public daystoGreen;
    public daystoOrange = 5;
    public daystoRed = 10;
}