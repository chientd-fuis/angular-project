import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit{
  fullname:string = '';
  total: number = 0;
  constructor(private router: ActivatedRoute) {}
  ngOnInit(): void {
    this.fullname = this.router.snapshot.queryParamMap.get('name') || '';
    const totalPrice = this.router.snapshot.queryParamMap.get('total') || '0';
    this.total = parseFloat(totalPrice);
  }


}
