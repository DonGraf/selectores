import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  //END-POINT de los servicios
  private _regiones: string [] = ['Africa', 'Americas', 'Asia', 'Europa', 'Oceania'];

  get regiones(): string[]{
    //arreglo desestructurado para evitar datos por referencias y datos en memoria
    return [...this._regiones];
  }

  constructor() { }
}
