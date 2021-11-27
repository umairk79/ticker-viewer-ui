import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../_services/login.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userAuthForm: FormGroup;
  submitted: Boolean = false;
  error: any;
  connect:Boolean = true;
  load:Boolean = false;
  isError:Boolean = false;

  data: any[] = []

  constructor(private formBuilder: FormBuilder, private _loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.userAuthForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
      subdomain: ["", Validators.required]
    });
    this.connect = true;
    this.load = false;
    this.isError = false;
  }
  setEmailValidator() {
    this.userAuthForm.get('email').setValidators(Validators.email);
  }

  setPasswordValidator() {
    this.userAuthForm.get('password').setValidators(Validators.required);
  }

  setSubdomainValidator() {
    this.userAuthForm.get('subdomain').setValidators(Validators.required);
  }

  tryAgain(){
    this.connect = true;
    this.load = false;
    this.isError = false;
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userAuthForm.invalid) {
      return
    }

    this.connect = false;
    this.load = true;
    this.isError = false;
    this._loginService.login(this.userAuthForm.value.email, this.userAuthForm.value.password, this.userAuthForm.value.subdomain).subscribe(
      data => {
      this.data = data;
      this.connect = true;
      this.load = false;
      this.isError = false;
      this.router.navigate(['tickets/'], {state: {data: this.data}})
    },
      error => {
        this.error = JSON.stringify(error.error.error);
        this.connect = false;
        this.load = false;
        this.isError = true;
      });
  }
}
