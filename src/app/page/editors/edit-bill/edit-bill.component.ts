import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, switchMap } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent {

  bill$: Observable<Bill> = this.activatedRoute.params.pipe(
    switchMap((params) =>
     params['id'] != 0 ? this.billService.get(params['id']) : of(new Bill())
    ),
  );

  bill: Bill = new Bill();

  constructor(
    private activatedRoute: ActivatedRoute,
    private billService: BillService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onUpdate(eventForm: NgForm, bill: Bill): void {
    if (bill.id === 0) {
      this.billService
        .create(bill)
        .subscribe((bill) => this.router.navigate(['/bills']));
    }
    this.billService
      .update(bill)
      .subscribe((bill) => this.router.navigate(['/bills']));
  }

  showToaster(){
    this.toastr.success('Successfully saved!')
  }

}
