import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  apiUrl: string = environment.apiUrl;
  entity: string = 'product';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}${this.entity}`);
  }

  get(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}${this.entity}/${id}`)
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}${this.entity}`, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${this.apiUrl}${this.entity}/${product.id}`,
      product
    );
  }

delete(product: Product): Observable<Product> {
  return this.http.delete<Product>(`${this.apiUrl}${this.entity}/${product.id}`)
}

}
