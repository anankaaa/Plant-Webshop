import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, switchMap } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent {


  order$: Observable<Order> = this.activatedRoute.params.pipe(
    switchMap((params) =>
     params['id'] != 0 ? this.orderService.get(params['id']) : of(new Order())
    ),
  );

  order: Order = new Order();

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onUpdate(eventForm: NgForm, order: Order): void {
    if (order.id === 0) {
      this.orderService
        .create(order)
        .subscribe((order) => this.router.navigate(['/orders']));
    }
    this.orderService
      .update(order)
      .subscribe((order) => this.router.navigate(['/orders']));
  }

  showToaster(){
    this.toastr.success('Successfully saved!')
    }
}
