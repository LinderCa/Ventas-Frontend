import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServiceService } from "../services/auth-service.service";

//Decordaror que indica a mi clase que permitira una inyeccion de dependencia
@Injectable ({providedIn: 'root'})

export class AuthGuard implements CanActivate{
  constructor(private _route:Router, private _apiAuth:AuthServiceService){

  }

  //Primer parametro que proporciona informacion sobre la ruta a activar
  //Segundo parametro,
  canActivate(route: ActivatedRouteSnapshot,
             state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree>
  {
    //Traemos el estado del usuario subcrito
    const usuario=this._apiAuth.usuarioData;
    if(usuario){
      return true;
    }else{
      //Si no se permite la navegacion entoncesmo redirigimos a otro enrutamiento
      this._route.navigate(['/']);
      return false;
    }
  }
}
