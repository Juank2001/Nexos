import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {
  public categorys: any
  constructor(
    private service: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategorys()
  }

  getCategorys() {
    //Se llama la funcion httpget establecida en el service para consultar los datos, luego los datos se guardan en la variable categorys products para ser utilizados en el html
    this.service.httpGet('categories').subscribe((resp: any) => {
      this.categorys = resp
    })
  }

  openProducts(id: number) {
    //Se redirecciona al componente products para consultar los productos segun la categoria seleccionada
    this.router.navigate(['/products/' + id])
  }

}
