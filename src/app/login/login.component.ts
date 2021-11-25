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

  data: any[] = []

  constructor(private formBuilder: FormBuilder, private _loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.userAuthForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
      subdomain: ["", Validators.required]
    });
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

  onSubmit() {
    this.submitted = true;
    if (this.userAuthForm.invalid) {
      return
    }
    this._loginService.login(this.userAuthForm.value.username, this.userAuthForm.value.password).subscribe(
      data => {
      this.data = data;
      this.router.navigate(['/dashboard'])
    },
      error => {
        console.log(error);
        this.error = error.statusText
        console.log(this.error)
      });
    console.log("Success")
  }
}
