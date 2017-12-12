import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { EmitterService } from '../services/emmiter.service';
import { PublishProblemService } from '../services/publishProblem.service';
import { AreaService } from '../services/area.service';
import { UserService } from '../services/user.service';
import { StatusService } from '../services/status.service';
import { Problem } from '../models/problem';
import { ITdDataTableColumn } from '@covalent/core';
import { TdDialogService } from '@covalent/core';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);


@Component({
  selector: 'problem-component',
  templateUrl: 'problem.component.html',
  styleUrls: ['problem.component.css']
})
export class ProblemComponent implements OnInit{
  
    configWidthColumns: ITdDataTableColumn[] = [
        { name: 'username',  label: 'Usuario', width: 100 },
        { name: 'area', label: 'Area', width: 100},
        { name: 'title', label: 'Asunto', width: { min: 150, max: 250 }},
        { name: 'folio', label: 'Folio'},
        { name: 'content', label: 'Contenido', width: 250},
        { name: 'createdAt', label: 'Fecha', width: 150},
        { name: 'status', label: 'Resuelto', width: 100},
      ];

      basicData: any[] =[]
    
    currentUser: any;
    folio: string;
    title: string;
    content: string = '';
    contentValue = this.content.length || 0;
    username: string;
    area: string;
    status: string;
    publicationsHTML:string;
    dataJELP:Problem[];
    solved: boolean = false;

    problems:Problem[];
    problem: any;
    areas= [];
    users = [];
    editing = false;
    userSrch:any;
    isNothing: boolean = false;
    isNothings: boolean = false;

    @Input()editId:string;
    @Input()listId:string;
    constructor(
        private publishProblemService: PublishProblemService,
        private areaService: AreaService,
        private userService: UserService,
        private statusService: StatusService
    ){
        this.loadAreas();
        this.loadUsers();
    }

    loadAreas() {
        this.areaService.getAreas()
        .subscribe(
            areas => {
                for(let areat in areas) {
                    this.areas.push({value: areas[areat].area, viewValue: areas[areat].area})
                }
            },
            err => {
                console.log(err)
            }
        );
    }

    loadUsers() {
        this.userService.getUsers()
        .subscribe(
            users => {
                for(let usert in users) {
                    this.users.push({value: users[usert].username, viewValue: users[usert].username})
                }
            }
        )
    }
    search() {
        console.log(`AREAS: ${this.area}`);
        console.log(`USERS: ${this.userSrch}`);

        if(!this.area && !this.userSrch || (!this.area && this.userSrch == '') || (!this.userSrch && this.area == '') || (this.userSrch == '' && this.area == '')) {
            console.log(`VOY A BUSCAR TODOS`)
            let problemOperation = this.publishProblemService.getProblems()

            problemOperation.subscribe(problems => {
                this.problems = problems;
                this.basicData = problems;
                console.log(JSON.stringify(this.problems));

                if(this.problems.length<1) {
                    console.log(`NO HAY NADA`)
                    this.isNothing = true;
                }
            },
            err => {
                console.error(err)
            })
        } else if(!this.area || this.area == '') {

                this.searchUsers(this.userSrch);

            }else if(!this.userSrch || this.userSrch == '') {
                this.searchAreas(this.area);
            } else {
                this.searchBoth(this.userSrch, this.area).then((alldata:Problem[]) => {
                    console.log(`FINALLY???`)
                    console.log(alldata)
                    this.dataJELP = alldata
                    console.log(this.dataJELP)
                    this.updateData()
                })
            }

            //this.isChecked(this.solved);
    }

    isChecked(sol) {
        for(let value in this.basicData) {
            if(this.basicData[value].status==sol) {
                this.basicData.splice(parseInt(value));
            }
        }
    }

    updateData() {
        //this.basicData = [{username: this.dataJELP[1].username, title: 'TITULAZO', area: 'AREAZAA', folio: 'FOLIAZO', content: 'CONTENIDAZO'}];
        setTimeout(() => {this.basicData = this.dataJELP},1000);
        //this.basicData = this.dataJELP
        console.log(this.basicData);
    }
    searchAreas(areas) {
        this.basicData=[];
        let datatmp = [];
        console.log(`VOY A BUSCAR EN TODOS LOS USUARIOS`)
        console.log(this.userSrch);
        for(let i=0; i< areas.length; i++) {
            let problemOperation = this.publishProblemService.getProblemsByArea(areas[i]);
                problemOperation.subscribe(problems=> {
                    this.problems = problems;
                    console.log(this.problems)
                    for(let problem of this.problems) {
                        datatmp.push(problem);
                        console.log(this.basicData);
                    }
                    this.basicData = datatmp;
                    console.log(this.basicData);
                },
                err => {
                    console.error(err);
                })
        }
    }

    searchUsers(users) {
            this.basicData=[];
            let datatmp = [];
            console.log(`VOY A BUSCAR EN TODAS LAS AREAS`)
            console.log(this.area);
            for(let i=0; i< users.length; i++) {
                let problemOperation = this.publishProblemService.getProblemsByUser({username: users[i]});
                    problemOperation.subscribe(problems=> {
                        this.problems = problems;
                        console.log(this.problems)
                        for(let problem of this.problems) {
                            datatmp.push(problem);
                            console.log(this.basicData);
                        }
                        this.basicData = datatmp;
                        console.log(this.basicData);
                    },
                    err => {
                        console.error(err);
                    })
            }
            return datatmp;
    }

    async searchBoth(users, areas) {
            this.basicData = [];
            let datatmp = [];
            console.log(`VOY A BUSCAR ALGUNOS USUARIOS EN ALGUNAS AREAS`);
            for(let i = 0; i<users.length; i++) {
                for(let j = 0; j< areas.length; j++) {
                    let problemOperation = this.publishProblemService.getProblemsByUserAndArea(users[i], areas[j]);
                     problemOperation.then(problems => {
                        console.log(`Usuario ${users[i]} EN AREA ${areas[j]} ${JSON.stringify(problems)}`);
                        if(problems.length > 0) {
                            for(let problem of problems) {
                                console.log(`AQUI SI SE HACEN COSAS`)
                                datatmp.push(problem);
                            }
                        } else {
                            console.log(`AQUI NOS E HACE NADA`)
                        }
                    },
                    err => {
                        console.error(err);
                    })   
                }
                
            }
            return datatmp;
            
    }



    ngOnInit() {
        this.isNothings = true;
    }
    
}
