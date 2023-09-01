import { Observable, of, switchMap } from 'rxjs';
import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap((params) =>
      params['id'] != 0
        ? this.productService.get(params['id'])
        : of(new Product())
    )
  );

  product: Product = new Product();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onUpdate(eventForm: NgForm, product: Product): void {
    if (product.id === 0) {
      this.productService
      .create(product)
      .subscribe((product) => this.router.navigate(['/products']));
    }
    this.productService
    .update(product)
    .subscribe((product) => this.router.navigate(['/products']));
  }

  showToaster(){
    this.toastr.success('Successfully saved!')
  }
}
