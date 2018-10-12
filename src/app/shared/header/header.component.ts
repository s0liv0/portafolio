import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { Router } from '@angular/router'; //Permite hacer la navegación interna en el controlador

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _servicio: InfoPaginaService,
              private router: Router ) { }

  ngOnInit() {
  }

  buscarProducto( termino: string ) {
    //Hago una pequeña validacion, no hacer nada si el termino es menor a una determinada cantidad de palabras
    if (termino.length <= 1) {
      return;
    }
    //Si no, hacemos la navegación
    this.router.navigate(['/search', termino]);

  }

}
