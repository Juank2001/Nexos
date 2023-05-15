import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: any
  constructor(private service: ServiceService) {
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    //Se llama la funcion httpget establecida en el service para consultar los datos, luego los datos se guardan en la variable publica products para ser utilizados en el html
    this.service.httpGet('products?offset=0&limit=10').subscribe((resp: any) => {
      this.products = resp

      //se carga el archivo js para las funciones del carrusel
      this.service.cargaScripts(["js/carrusel"])
    })
  }

  AddCart(product: any) {
    //Se envia el producto al carrito
    this.service.addtocart(product)
  }

}
