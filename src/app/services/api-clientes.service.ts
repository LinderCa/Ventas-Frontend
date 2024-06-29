import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsee } from 'src/Models/Responsee';

//Decorador que indica que la clase tendra la posibilidad de inyectarse como dependenci
@Injectable({
  providedIn: 'root', //indica que sera accesible a cualquier recurso de la pagina
})
export class ApiClientesService {
 private url:string="http://localhost:5111/cliente";
  //Inyectamos el modulo para las solicitudes http
  constructor(private _http:HttpClient) { }

  //Este observable emite datos rescibidos por la respuesta de HTTP en un estado completado, si en caso falla, entonces emite un error
  public getAll():Observable<Responsee>{
    return this._http.get<Responsee>(`${this.url}/Cliente`)
  }

}
