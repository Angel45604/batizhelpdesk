import { Component, OnInit, OnChanges } from '@angular/core';
import { AreaService } from '../services/area.service';
import { Area } from '../models/area';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'area-component',
  templateUrl: 'area.component.html',
  styleUrls: ['area.component.css']
})
export class AreaComponent implements OnInit, OnChanges {
  
  constructor(private areaService: AreaService, public snackBar: MatSnackBar) {}
  
  areas: Area[];
  area: string;
  id: number;
  isDeleting : boolean;


  loadAreas() {
    this.areaService.getAreas().subscribe(areas => {
      this.areas = areas;
      console.log(this.areas);
    },
    err => {
      console.error(err);
    })
  }

  addArea() {
    console.log(this.area)
    let area = {area: this.area};
    let areaOperation;
    areaOperation = this.areaService.addArea(area);

    areaOperation.subscribe(
        area => {
            console.log(`Area: ${area}`);
          //EmitterService.get(this.listId).emit(comments);
          let snackBarAddArea = this.snackBar.open('Área agregada exitosamente');
          setTimeout( () => {
            snackBarAddArea.dismiss()
          },1500);
          this.loadAreas();
          this.area = '';
        },
        err =>{
          console.log(err);
        });
  }

  removeArea(area) {
    this.areaService.removeArea(area.area).subscribe(res => {
      console.log(res)
      let snackBarRemoveArea = this.snackBar.open('Área eliminada exitosamente');
      setTimeout( () => {
        snackBarRemoveArea.dismiss()
      },1500);
      this.loadAreas()
    }, 
    err =>console.error(err));
    console.log(area);
  }

  confirmDelete(area) {
    console.log(area);
  }

  ngOnInit() {
    this.loadAreas()
  }

  ngOnChanges() {

  }
    
}
