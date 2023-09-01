import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, switchMap } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent {
  customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap((params) =>
      params['id'] != 0
        ? this.customerService.get(params['id'])
        : of(new Customer())
    )
  );

  phrases: string[] = [];
  phrase: string = '';
  key: string = 'add';

  customer: Customer = new Customer();

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onUpdate(eventForm: NgForm, customer: Customer): void {
    if (customer.id === 0) {
      this.customerService
        .create(customer)
        .subscribe((customer) => this.router.navigate(['/customers']));
    }
    this.customerService
      .update(customer)
      .subscribe((customer) => this.router.navigate(['/customers']));
  }


  showToaster() {
    this.toastr.success('Successfully saved!');
  }
}




