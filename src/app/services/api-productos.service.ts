import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from 'src/Models/Productos';
import { RequestProducto } from 'src/Models/RequestProducto';
import { Responsee } from 'src/Models/Responsee';

const httpOption={
  headers:new HttpHeaders({
    'Content-Type':'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class ApiProductosService {
  header:string='';
  //Propiedades para la solicitur
  url:string="http://localhost:5111/productos";

  //Inyectamos como dependencia el modulo para trabajar con apis
  constructor(private _http:HttpClient) { }

  getAll():Observable<Responsee>{
    return this._http.get<Responsee>(`${this.url}/Productos`);
  }

  postProducto(producto: RequestProducto ): Observable<Responsee>{
    return this._http.post<Responsee>(`${this.url}/Productos`,producto,httpOption);
  }

  putProducto(producto: Productos):Observable<Responsee>{
    return this._http.put<Responsee>(`${this.url}/Productos`,producto,httpOption);
  }

  deleteProducto(id:Number):Observable<Responsee>{
    return this._http.delete<Responsee>(`${this.url}/Productos/?id=${id}`);
  }
}
