import { environment } from './../../environments/environment.prod';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl: string = environment.apiUrl;
  entity: string = 'category';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}+${this.entity}`);
  }
}
