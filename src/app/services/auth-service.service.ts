import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ResponseLogin } from 'src/Models/ReponseLogin';
import { RequestLogin } from 'src/Models/RequestLogin';
import { Responsee } from 'src/Models/Responsee';

const options= {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  //Propiedades
  url:string="http://localhost:5111/";

  //Instanciamos de un Subject

  private usuarioSubject: BehaviorSubject<ResponseLogin |null>;

  //DEfinimos un observador
  //public usuarioObservable:Observable<ResponseLogin>;

  //Funcion pa retornar el usuario
  public get usuarioData():ResponseLogin | null{
    return this.usuarioSubject.value;
  }

  //Inyectamos el servicio de apiRest, para consumir mediante solicitudes
  constructor(private _api: HttpClient) {
    //Intentamos obtener el objeto de usuario del local storage
    const usuario= localStorage.getItem('usuario');
    //Intentamos instanciar el estado del usuario
    this.usuarioSubject=new BehaviorSubject<ResponseLogin | null>(usuario?JSON.parse(usuario):null );
    console.log("CONSTURCTOR: el usuario Subject es: ",this.usuarioSubject);

  }

  login(data:RequestLogin):Observable<Responsee>{
    //Recibimos funciones dada la respuesta de la solicitud post, lo analizamos antes de retornarlo
    return this._api.post<any>(`${this.url}\Login`,data,options).pipe(
      map(res=>{
        if(res.codigo === 2){
          //Si la solicitud es correcta realizamos el proceso
          //Instanciamos un respuesta
          const user:ResponseLogin= res.objeto;
          //Lo almacenamos en la localStore
          localStorage.setItem('usuario',JSON.stringify(user));
          //Emitimos un valor al subcriptor antes o despues con el tipo BehaviorSubject
          this.usuarioSubject.next(user);
          console.log("Esto es un user de Subject: ",user);
        }
        return res;
      })
    );
  }

  logout(){
    //Removemos la sesion de lo que esta guardado
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }
}
