import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public numItemsCart: number = 0
  constructor(
    private service: ServiceService
  ) { }

  ngOnInit(): void {
    //Se utiliza el evento del service paraactualizar el contador del carrito
    let cart = JSON.parse(localStorage.getItem('cart') || "[]")
    this.numItemsCart = cart.length
    this.service.cartChange.subscribe((resp: any) => {
      console.log(resp)
      this.numItemsCart = resp
    })
  }

}
