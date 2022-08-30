import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais, PaisSMall } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  //END-POINT de los servicios
  private _regiones: string [] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private baseUrl: string = 'https://restcountries.com/v2';
  get regiones(): string[]{
    //arreglo desestructurado para evitar datos por referencias y datos en memoria
    return [...this._regiones];
  }

  constructor(private http: HttpClient) { }

  getPaisesPorRegion (region:string): Observable<PaisSMall[]>{
    const url: string = `${ this.baseUrl}/region/${region}?fields=name,alpha3Code`
    return this.http.get<PaisSMall[]>(url);
  }
  getPaisPorCodigo( codigo: string): Observable<Pais | null>{
    if(!codigo){
      return of(null);
    }
    const url = `${this.baseUrl}/alpha/${codigo}`;
    return this.http.get<Pais>(url);
  }

  //obtener el codigo y el nombre del pais
  getPaisPorCodigoSmall( codigo: string): Observable<PaisSMall>{

    const url = `${this.baseUrl}/alpha/${codigo}?fields=alpha3Code,name`;
    return this.http.get<PaisSMall>(url);
  }

  getPaisesPorCodigo(borders: string[]): Observable<PaisSMall[]>{
    if( !borders){
      return of([]);
    }

    const peticiones:Observable<PaisSMall>[] = [];
    borders.forEach(codigo => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion);
    });
    //regresa un observable con todos los datos de las peticiones internas en un array
    return combineLatest(peticiones);
  }
}
