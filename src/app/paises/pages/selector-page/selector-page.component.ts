import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisSMall } from '../../interfaces/paises.interfaces';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    //Definicion del formulario
    region: ['',Validators.required]
  });

  //llenar selectores
  regiones: string[] = [];
  paises: PaisSMall[] = [];

  constructor(private fb: FormBuilder,
              private paisesService: PaisesService) { }

  ngOnInit(): void {
    //envio de la data a la vista
    this.regiones = this.paisesService.regiones;

    //Cuando seleccione la region
    this.miFormulario.get('region')?.valueChanges.subscribe(region => {
      console.log(region);
      this.paisesService.getPaisesPorRegion(region).subscribe( paises => {
        this.paises = paises;
        console.log(paises);
      })
    })
  }

  //metodo
  guardar(){
    console.log(this.miFormulario.value);
  }
}
