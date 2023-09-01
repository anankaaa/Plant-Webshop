import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})

export class BillListComponent implements OnInit {

  billList$: Observable<Bill[]> = this.billService.getAll();

  columns = this.configService.billTableColumns;

  bills: Bill[] = [];

  constructor(
    private billService: BillService,
    private configService: ConfigService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.billList$
    .subscribe(bills => this.bills = bills);
  }

  onEdit(bill: Bill):void {
    this.router.navigate(['/edit-bill', bill.id])
   }

   onDelete(bill: Bill):void {
     this.billService.delete(bill).subscribe(
       () => this.billList$ = this.billService.getAll(),
     )
     this.toastr.warning( 'Bill is deleted!', 'WARNING!',);
   }
}
