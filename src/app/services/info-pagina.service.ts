import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};

  cargada: boolean = false;

  equipo: any[] = [];

  constructor( private http: HttpClient) {

/*     console.log("Servicio de InfoPagina cargado"); */
    this.cargarInfo();
    this.cargarEquipo();
   }

   private cargarInfo() {
    //Leer el archivo JSON
    this.http.get("assets/data/data-pagina.json")
      .subscribe( (resp: InfoPagina) => {
       /*  console.log(resp); */
      this.cargada = true;
      this.info = resp;

/*        console.log( resp["twitter"]); */
      }); //Mira una respuesta y procesala con el callback
   }

   private cargarEquipo () {
    //Leer el archivo JSON
    this.http.get("https://angular-portafolio-8a6ee.firebaseio.com/equipo.json")
      .subscribe( (resp: any[]) => {
       /*  console.log(resp); */
      this.equipo = resp;

/*        console.log( this.equipo ); */
      }); //Mira una respuesta y procesala con el callback
   }
}
