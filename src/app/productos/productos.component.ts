import { Component, OnInit } from '@angular/core';
import { ApiProductosService } from '../services/api-productos.service';
import { Productos } from 'src/Models/Productos';
import { Responsee } from 'src/Models/Responsee';
import { RequestProducto } from 'src/Models/RequestProducto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{
  constructor(private _api:ApiProductosService){}

  //PROPIEDADES
  producto:string="producto";
  ListProductos:(Productos | {
    id:number,
    nombre:string,
    precioUnitario:number,
    costo:number})[]=[];
  //Activo e inactivo
  activo:boolean=false;

  //Campos
  id:string='';
  nombreProducto: string='';
  precioUnitario:string='';
  costoTotal:string='';

  productos:boolean=false;

  //CICLOS DE VIDA
  ngOnInit(): void {
    this.cargarProductos();
  }

  //METODOS
  cargarProductos() {
    var respuesta=this._api.getAll().subscribe({
      next: (response:Responsee)=>{
        if(response!=null && Array.isArray(response.objeto) ){
          console.log("La respuesta traida es: ",response);
          this.ListProductos=response.objeto;
        }else{
          console.error("EL OBJETO NO ES UN ARRAY");
        }
        console.log("La lista de producto es: ",this.ListProductos);
      },
      error: (error)=>{this.ListProductos=[{id:0,nombre:`NO EXISTEN DATOS`,precioUnitario:0,costo:0}]}
    });
  }

  activarComponente(estado:boolean){
    this.productos=false;
    this.activo=estado;
  }

  limpiarCampos(){
    this.nombreProducto='';
    this.precioUnitario='';
    this.costoTotal='';
  }

  registrarProducto(){
    //Verificamos si los datos no estan vacios
    if(!this.nombreProducto || !this.precioUnitario || !this.costoTotal){
      alert("Porfavor, complete todos los campos");
      return;
    }

    //Registro de un nuevo Producto
    if(this.productos==false){
      //Creamos el objeto producto
      const nuevoProd:RequestProducto={
        nombre:this.nombreProducto,
        precioUnitario:Number(this.precioUnitario),
        costo:Number(this.costoTotal)
      }

      //DEfinir el servicio de producto
      var respuesta=this._api.postProducto(nuevoProd).subscribe(
        {next: (response)=>{
          this.cargarProductos();
          this.limpiarCampos();
        }}
      );
      }else{
        //Armamos la estructura
        const actualizar:Productos={
          id:Number(this.id),
          nombre:this.nombreProducto,
          precioUnitario:Number(this.precioUnitario),
          costo:Number(this.costoTotal)
        }
        //Consumimos la api
        this._api.putProducto(actualizar).subscribe(
          {next:(response)=>{
            console.log("Producto editado: ",response);
            this.cargarProductos();
            this.limpiarCampos();
          }}
        );
      }
    //Desactivamos el registro de producto
    this.activo=false;
  }

  editarProducto(...arreglo:any){
    //Se trata de un producto creado a editar
    this.productos=true;
    const [a_id,a_nombre,a_pre,a_cos]=arreglo;

    //Llenamos el formulario con el producto a actualizar
    this.id=a_id;
    this.nombreProducto=a_nombre;
    this.precioUnitario=a_pre.toString();
    this.costoTotal=a_cos.toString();
    //Activamos el formulario de registro
    this.activo=true;
  }

  eliminarProducto(id:Number){
    console.log("el id a eliminar: ",id);
    this._api.deleteProducto(id).subscribe(
      {next:(response)=>{
        console.log("El producto eliminado es: ",response);
        this.cargarProductos();
      }}
    );
  }
}
