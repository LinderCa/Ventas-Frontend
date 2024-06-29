import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthServiceService } from "../services/auth-service.service";
import { Injectable } from "@angular/core";

@Injectable()

export class jwtInterceptor implements HttpInterceptor{
  constructor( private _apiAuth: AuthServiceService){}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Verificamos el estado del usuario
    const usuario=this._apiAuth.usuarioData;
    if(usuario){
      req=req.clone({
        setHeaders:{
          Authorization: `Bearer ${usuario.token}`
        }
      });
    }

    //Pasar la soliciutd clonada al sigueinte manejador
    return next.handle(req);
  }


}
