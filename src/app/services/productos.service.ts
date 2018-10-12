import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Producto} from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) { 

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise( (resolve, reject) => {

      this.http.get("https://angular-portafolio-8a6ee.firebaseio.com/productos_idx.json")
      .subscribe( (resp: Producto[]) => {
        this.cargando = false;
        this.productos = resp;
        resolve();
      });

    });


  }

  public getProducto(id: string) {
    //Devuelvo el siguiente Observable
    return this.http.get(`https://angular-portafolio-8a6ee.firebaseio.com/productos/${id}.json`)
  }

  public buscarProductos(termino: string) {

    if (this.productos.length == 0) {
      //cargar productos
      this.cargarProductos().then( ()=> {
        //Se va a ejecutar, despues de tener los productos
        //Aplicar el filtro
        this.filtrarProductos(termino);
      });
    } else {
      //aplicar el filtro
      this.filtrarProductos(termino);
    }
  }

private filtrarProductos( termino: string) {
 
  //Resetea los productos filtrados 
  this.productosFiltrado = [];

  //Convertimos el termino a minusculas
  termino = termino.toLocaleLowerCase();

  this.productos.forEach( prod => {

    const tituloLower = prod.titulo.toLocaleLowerCase();
    if (prod.categoria.indexOf(termino) >=0 || prod.titulo.indexOf(termino) >=0){
      this.productosFiltrado.push(prod);
    }
  });
}

}
