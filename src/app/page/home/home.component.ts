import { Component, OnInit, ViewChild } from '@angular/core';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { BillService } from 'src/app/service/bill.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { ChartComponent } from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';
import { map, Observable } from 'rxjs';
import * as ApexCharts from 'apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  activeCustomers: Customer[] = [];

  activeProducts: Product[] = [];

  statusOrders: Order[] = [];

  billList: Bill[] = [];


  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: any;

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrderService,
    private billService: BillService
  ) {

  }


  ngOnInit(): void {

    this.customerService
      .getAll()
      .subscribe(
        (customers) =>
          (this.activeCustomers = customers.filter(
            (customer) => customer.active == true
          ))
      );

    this.productService
      .getAll()
      .subscribe(
        (products) =>
          (this.activeProducts = products.filter(
            (product) => product.active == true
          ))
      );

    this.orderService
      .getAll()
      .subscribe(
        (orders) =>{
          (this.statusOrders = orders.filter(
            (order) => order.status != 'paid'
          ));
        }
          );

          this.orderService
          .getAll()
          .subscribe(
            (orders) =>{
              (this.statusOrders = orders.filter(
                (order) => order.status == 'paid' || order.status == 'new' || order.status == 'shipped'
              ));
              this.getOrderChartOptions();
            }
              );

              this.billService
              .getAll()
              .subscribe(
                (bills) =>{
                  (this.billList = bills.filter(
                    (bill) => bill.status == 'paid' || bill.status == 'new'
                  ));
                  this.getBillStatus();
                }
                  );

    this.billService
      .getAll()
      .subscribe(
        (bills) =>
          (this.billList = bills.filter((bill) => bill.status == 'new'))
      );
  }

  getUnpaidAmount(): number {
    let amount = 0;
    this.billList.forEach((bill) => (amount += bill.amount));
    return amount;
  }

  getOrderChartOptions(): void {
    let options = {
      series: [
        this.statusOrders.filter(order => order.status === 'new').length,
        this.statusOrders.filter(order => order.status === 'paid').length,
        this.statusOrders.filter(order => order.status === 'shipped').length
      ],
      chart: {
        width: 420,
        height:300,
        type: 'pie',
    },
    labels: ['New orders', 'Paid orders', 'Shipped orders'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };

    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }

  getBillStatus(): void {
    let options = {
      series: [
        this.billList.filter(bill => bill.status === 'paid').length,
        this.billList.filter(bill => bill.status === 'new').length,

      ],
      chart: {
        width: 420,
        height: 300,
        type: 'pie',
    },
    labels: ['Paid bills', 'New bills'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };

    let chart = new ApexCharts(document.querySelector("#bill"), options);
    chart.render();
  }
}



