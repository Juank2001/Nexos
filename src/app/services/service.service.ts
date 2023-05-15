import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  //Se establece la ruta de la api para consultar los datos
  private apiUrl = "https://api.escuelajs.co/api/v1/";
  public cart: Object[] = []
  //Se crea un evento para escuchar los cambios del carrito (Producto agregado - eliminado)
  public cartChange: EventEmitter<number> = new EventEmitter<number>()

  constructor(
    private http: HttpClient
  ) { }

  httpGet(path: string) {
    //se importa el modulo de hhtpclient para hacer peticiones hhtp (Get, post, put, delete)
    /*Esta funcion retorna la informacion que se pide a la url formada por la apiUrl como base y como complemento el endpoint que se envia desde loc componentes*/
    return this.http.get(this.apiUrl + path)
  }

  cargaScripts(archivos: string[]) {
    /*Esta funcion agrega los scripts javascript necesarios al body de la pagina*/
    for (let archivo of archivos) {
      let script = document.createElement('script')
      script.src = "./assets/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0]
      body.appendChild(script)
    }
  }

  addtocart(producto: any) {
    /*En esta funcion se guardan los productos que se agregan al carrito en el localstorage para ser consultados facilmente*/
    /*Cuando el carrito esta vacio se agrega un nuevo elemento al arreglo, cuando ya existe el producto en el arreglo solo se modifica la cantidad seleccionada*/
    this.cart = JSON.parse(localStorage.getItem('cart') || "[]")
    let cant = 1
    let exist = false
    this.cart.forEach(
      (e: any) => {
        if (e.id == producto.id) {
          exist = true
          e.cant = e.cant + cant
        }
      }
    );
    if (!exist) {
      this.cart.push({ name: producto.title, price: producto.price, cant: cant, images: producto.images, description: producto.description, id: producto.id })
    }

    //Se envia el evento para que se actualice el contador en el header
    this.cartChange.emit(this.cart.length)
    localStorage.setItem('cart', JSON.stringify(this.cart))
    alert('Producto agregado al carrito')
  }

  deletetocart(id: any) {
    /*Para eliminar el producto se realiza un filtro sacando del arreglo el producto que se quiere eliminar*/
    return new Promise((resolve, reject) => {
      this.cart = JSON.parse(localStorage.getItem('cart') || "[]")
      this.cart = this.cart.filter((product: any) => product.id != id)
      this.cartChange.emit(this.cart.length)
      localStorage.setItem('cart', JSON.stringify(this.cart))
      resolve(this.cart)
    })
  }
}
