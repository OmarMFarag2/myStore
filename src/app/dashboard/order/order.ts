import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit {

  orders: Order[] = [];

  statuses = [
    'Pending',
    'Shipped',
    'Completed',
    'Canceled'
  ];

  loading = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.loading = true;

    this.orderService.getAllOrders().subscribe({
      next: (res: Order[]) => {
        this.orders = res;
        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  updateStatus(order: Order) {

    this.orderService.updateOrderStatus(order._id, {
      status: order.status
    }).subscribe({
      next: () => {
        console.log('Status updated');
      },
      error: err => {
        console.log(err);
      }
    });

  }

}
