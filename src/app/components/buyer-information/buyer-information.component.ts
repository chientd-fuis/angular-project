import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buyer-information',
  templateUrl: './buyer-information.component.html',
  styleUrls: ['./buyer-information.component.css']
})
export class BuyerInformationComponent implements OnInit {
  isSubmitted: boolean = false;
  createForm: FormGroup;

  @Output() checkout = new EventEmitter();

  constructor(private fb: FormBuilder){}


  ngOnInit(): void {
    this.createForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.maxLength(55)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      creditcard: ['', [Validators.required, Validators.maxLength(16)]],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.createForm.invalid) {
      return;
    }
    this.checkout.emit(this.createForm.value);
  }
}
