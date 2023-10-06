import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buyer-information',
  templateUrl: './buyer-information.component.html',
  styleUrls: ['./buyer-information.component.css']
})
export class BuyerInformationComponent implements OnInit {

  createForm: FormGroup;
  isSubmitted: boolean = false;
  @Output() checkout = new EventEmitter();

  constructor(private fb: FormBuilder){}


  ngOnInit(): void {
    this.createForm = this.fb.group({
      fullname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      creditcard: ['', [Validators.required, Validators.maxLength(16)]],
    });
  }
  get creditcard() {
    return this.createForm.get('creditcard');
  }
  get fullname() {
    return this.createForm.get('fullname');
  }
  get address() {
    return this.createForm.get('address');
  }
  

  onSubmit() {
    this.isSubmitted = true;

    if (this.createForm.invalid) {
      return;
    }
    this.checkout.emit(this.createForm.value);
  }
}
