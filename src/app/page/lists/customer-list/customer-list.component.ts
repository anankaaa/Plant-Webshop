import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { ConfigService } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent<T extends { [x: string]: any }>
  implements OnInit
{
  @Input() listers: T[] = [];
  @Input() headers: string[] = [];
  customerList$: Observable<Customer[]> = this.customerService.getAll();

  columns = this.configService.customerTableColumns;

  customers: Customer[] = [];

  sortKey: string = '';
  sortDirection: number = 1;

  key: string = '';
  phrases: string[] = [];
  filterPhrase: string = '';
  sortHeader: string = '';

  page: number = 1;

  constructor(
    private customerService: CustomerService,
    private configService: ConfigService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onEdit(customer: Customer): void {
    this.router.navigate(['/edit-customer', customer.id]);
  }

  onDelete(customer: Customer): void {
    this.customerService
      .delete(customer)
      .subscribe(() => (this.customerList$ = this.customerService.getAll()));
    this.toastr.warning('Customer is deleted!', 'WARNING!');
  }

  ngOnInit(): void {
    this.customerList$
    .subscribe(customers => this.customers = customers);
  }


  startSort(key: string): void {
    if (key === this.sortKey) {
      this.sortDirection *= -1;
    } else {
      this.sortDirection = 1;
    }

    this.sortKey = key;
  }

  onPhraseChange(header: string, index: number) {
    this.key = header;
    this.filterPhrase = this.phrases[index];
  }

  clearFilterAndSortInputs() {
    this.filterPhrase = '';
    this.key = '';
    for (let i = 0; i < this.phrases.length; i++) {
      this.phrases[i] = '';
    }
  }
}
