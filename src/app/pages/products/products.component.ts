import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  //Se declaran las variables a utilizar
  private limit: number = 10;
  public offset: number = 0;
  private ArrayProducts: any = []
  public products: any = []
  public isCategory: boolean = false

  constructor(
    private service: ServiceService,
    private router: ActivatedRoute,
    private _router: Router) {
  }

  ngOnInit(): void {
    //El componente detecta si se envia una categoria y asi decide si listar todos los productos o los indexdos a la categoria seleccionada
    let category = this.router.snapshot.params['category']
    if (category != undefined) {
      this.getProductsCategory(category)
      this.isCategory = true
    } else {
      this.getProducts()
      this.isCategory = false
    }
  }

  getProducts() {
    //Se envia el endpoint para listar los productos desde la api
    this.service.httpGet('products?offset=' + this.offset + '&limit=' + this.limit).subscribe((resp: any) => {
      this.ArrayProducts = resp
      this.products = resp
    })
  }

  getProductsCategory(id: number) {
    //Se envia el endpoint para filtrar los productos desde la api por categoria
    this.service.httpGet('categories/' + id + '/products').subscribe((resp: any) => {
      this.ArrayProducts = resp
      this.products = resp
    })
  }

  setlimit(event: any) {
    this.limit = event.target.value || 10
    this.getProducts()
  }

  search(valor: any) {
    //se filtran los productos de acuerdo a los criterios del input de busqueda
    this.products = this.ArrayProducts.filter((item: any) => {
      return item.title.toLowerCase().indexOf(
        valor.target.value.toLowerCase()) > -1;
    });
  }

  AddCart(product: any) {
    //Se agrega el producto al carrito
    this.service.addtocart(product)
  }

  openProduct(id: any) {
    //Se abre el detalle del producto seleccionado
    this._router.navigate(['product/' + id])
  }

}
