
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/service/config.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit{
  productList$: Observable<Product[]> = this.productService.getAll();

  columns = this.configService.productTableColumns;

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private configService: ConfigService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productList$
    .subscribe(products => this.products = products);
  }

  //productList$ = combineLatest({
  //  cat: this.categoryService.getAll(),
  //  prod: this.productService.getAll(),
  //}).pipe(
  //  map(result =>
  //    result.prod.map(product => {
  //      product.catId = result.cat.find(c => c.id === product.id);
  //      return product;
  //    })
  //  )
  //);

onEdit(product: Product): void {
  this.router.navigate([`/edit-product`, product.id])
}


  onDelete(product: Product): void {
    this.productService
      .delete(product)
      .subscribe(() => (this.productList$ = this.productService.getAll()));
    this.toastr.warning('Product is deleted!', 'WARNING!');
  }
}

