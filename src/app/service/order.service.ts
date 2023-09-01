import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl: string = environment.apiUrl
  entity: string = 'order'

  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}${this.entity}`)
  }

  get(id: number): Observable<Order>{
    return this.http.get<Order>(`${this.apiUrl}${this.entity}/${id}`)
  }

 create(order: Order): Observable<Order>{
    return this.http.post<Order>(
    `${this.apiUrl}${this.entity}`,
    order)
    }

 update(order: Order): Observable<Order>{
    return this.http.patch<Order>(
    `${this.apiUrl}${this.entity}/${order.id}`,
    order)
    }

 delete(order: Order): Observable<Order>{
    return this.http.delete<Order>(`${this.apiUrl}${this.entity}/${order.id}`)
    }
}
