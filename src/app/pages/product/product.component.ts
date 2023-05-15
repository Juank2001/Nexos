import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public currentImg: string = ''
  public product: any
  constructor(
    private service: ServiceService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let id = this.router.snapshot.params['id']
    this.getproduct(id)
  }

  getproduct(id: any) {
    //Se envia el endpoint para filtrar los productos desde la api
    this.service.httpGet('products/' + id).subscribe((resp: any) => {
      this.currentImg = resp.images[0]
      this.product = resp
    })
  }

  setCurrentImg(img: string){
    //Se establece la url de la imagen segun se seleccione
    this.currentImg = img
  }

  AddCart(product: any) {
    //Se agrega el producto al carrito
    this.service.addtocart(product)
  }

}
