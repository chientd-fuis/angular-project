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
    const {fullname, total} = this.router.snapshot.params;
    this.fullname = fullname;
    this.total = total;
  }


}
