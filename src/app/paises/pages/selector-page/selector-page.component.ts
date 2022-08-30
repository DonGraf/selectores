import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
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
    region: ['',Validators.required],
    pais: ['',Validators.required],
    frontera: ['', Validators.required]
  });

  //llenar selectores
  regiones: string[] = [];
  paises: PaisSMall[] = [];
  //fronteras: string[] = [];
  fronteras: PaisSMall[] = [];
  cargando: boolean = false;

  constructor(private fb: FormBuilder,
              private paisesService: PaisesService) { }

  ngOnInit(): void {
    //envio de la data a la vista
    this.regiones = this.paisesService.regiones;

    //Cuando seleccione la region
    this.miFormulario.get('region')?.valueChanges.
    //operador de rxjs
    pipe(
      tap( ( _ ) => { this.miFormulario.get('pais')?.reset('');
    this.cargando=true} ), 
      switchMap( region => this.paisesService.getPaisesPorRegion(region))
      
    ).subscribe( paises => { this.paises = paises;
      this.cargando = false;}
      )
    
    //Cuando cambia el pais
    this.miFormulario.get('pais')?.valueChanges.pipe(
      tap( ( _ ) => { 
        //reset de frontera

        //reset de formulario
        this.miFormulario.get('frontera')?.reset('');
        this.cargando=true;} ), 
      switchMap( codigo => this.paisesService.getPaisPorCodigo(codigo)),
      switchMap( pais => this.paisesService.getPaisesPorCodigo( pais?.borders!))
      ).subscribe(paises => {
      this.fronteras = paises || [];
      this.cargando = false;
    })
  }


  //metodo
  guardar(){
    console.log(this.miFormulario.value);
  }
}
