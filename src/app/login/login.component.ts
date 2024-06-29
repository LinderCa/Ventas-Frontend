import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestLogin } from 'src/Models/RequestLogin';
import { Responsee } from 'src/Models/Responsee';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Propieades
  loginForm: FormGroup; //Instanciamos un FormGroup
  respuesta?:Responsee;

  //Constructor
  constructor( private route: Router,private _authService:AuthServiceService){
    this.loginForm= new FormGroup({
      Ruc: new FormControl('',[Validators.required, Validators.minLength(11)]),
      Dni: new FormControl('',[Validators.required, Validators.minLength(8)]),
      password: new FormControl('',[Validators.required]),
    });

    /*
    if(this._authService.usuarioData){
      this.route.navigate(['/home']);
    }*/
  }
  onSubmit(){
    //Veriicamos que el usuario sea valido
    if(this.loginForm.valid){
      //ARMAMOS LA ESTRUCTURA DEL FORMULARIO
      const formLogin:RequestLogin={
        Ruc:this.loginForm.value.Ruc,
        Dni:this.loginForm.value.Dni,
        password:this.loginForm.value.password,
      };
      console.log(formLogin);

      //Consumimos el servicio
      this._authService.login(formLogin).subscribe(
        (respuesta)=>{
          console.log("Se logro un valor emitido: ",respuesta);
          if(respuesta.codigo===2){
            //nos dirigimos a otra ruta
            this.route.navigate(['/home'])
          }else
          //Si la solicitud no es correcta nos dirigimos al login
          this.route.navigate(['']);
        }
      );
    }
  }
}
