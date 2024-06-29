import { Component, OnInit } from '@angular/core';
import { ApiClientesService } from '../services/api-clientes.service';
import { ClienteResponse } from 'src/Models/ClienteResponse';
import { Responsee } from 'src/Models/Responsee';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{
  cliente: string="cliente";
  clientes: string="clientes";

  //Definimos el objeto de respuesta
  respuesta?:Responsee;
  ListClientes:(ClienteResponse | {idCliente: string, nombre:string})[]=[];
  //Inyectamos el servicio de la api personalizada
  constructor (private api:ApiClientesService){
  }
  ngOnInit(): void {
    this.CargarClientes();
  }

  //Metodo para realizar una solocitud get- retorna todos los clientes
  public CargarClientes(): void {
    this.api.getAll().subscribe({
      next: (response: Responsee) => {
        this.respuesta = response;
        console.log(this.respuesta);
        // Verificar si la respuesta tiene la propiedad 'objeto' y si es un array
        if (this.respuesta && Array.isArray(this.respuesta.objeto)) {
          this.ListClientes = this.respuesta.objeto;
        } else {
          console.error('La propiedad "objeto" no es un array en la respuesta', this.respuesta);
        }
        console.log(this.ListClientes);
      },
      error: (error)=>{
        this.ListClientes=[{idCliente:"null",nombre:"NO EXISTEN DATOS"}]
      }
    });
  }
}


