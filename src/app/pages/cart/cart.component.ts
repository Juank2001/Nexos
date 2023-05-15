import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public carts: any
  constructor(private service: ServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.getcart()
  }

  getcart() {
    //Se llama la funcion httpget establecida en el service para consultar los datos, luego los datos se guardan en la variable carts products para ser utilizados en el html
    this.carts = JSON.parse(localStorage.getItem('cart') || "[]")
    console.log(this.carts)
  }

  deleteProd(id: any) {
    //Se envia el producto para eliminar
    this.service.deletetocart(id).then((resp: any) => {
      this.carts = resp
    })
  }

  openProduct(id: any) {
    //Se abre el detalle del producto seleccionado
    this._router.navigate(['product/' + id])
  }
}
