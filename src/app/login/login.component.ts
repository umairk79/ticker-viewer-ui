import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../_services/login.service';
import { Router } from "@angular/router"
import { Tickets } from '../_model/tickets';


/**
 * Login page component
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Component params
  userAuthForm: FormGroup;
  submitted: Boolean = false;
  error: any;
  connect:Boolean = true;
  load:Boolean = false;
  isError:Boolean = false;

  data: Tickets;

  // Constructor 
  constructor(private formBuilder: FormBuilder, private _loginService: LoginService, private router: Router) { }

  // Angular init directive
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

  // Email validation method
  setEmailValidator() {
    this.userAuthForm.get('email').setValidators(Validators.email);
  }

  // Password validation method
  setPasswordValidator() {
    this.userAuthForm.get('password').setValidators(Validators.required);
  }

  // Subdomain validation method
  setSubdomainValidator() {
    this.userAuthForm.get('subdomain').setValidators(Validators.required);
  }

  // Method to enable connect button when user wants to try again.
  tryAgain(){
    this.connect = true;
    this.load = false;
    this.isError = false;
    this.submitted = false;
  }

  // Method to connect with backend upon form submission 
  onSubmit() {
    this.submitted = true;
    if (this.userAuthForm.invalid) {
      return
    }

    this.connect = false;
    this.load = true;
    this.isError = false;
    this._loginService.login(this.userAuthForm.value.email, this.userAuthForm.value.password, this.userAuthForm.value.subdomain, 1).subscribe(
      data => {
      this.data = data;
      this.connect = true;
      this.load = false;
      this.isError = false;
      if (typeof (Storage) !== 'undefined') {
        sessionStorage.setItem('tickets', JSON.stringify(this.data["tickets"]));
        sessionStorage.setItem('totalCount', JSON.stringify(this.data["count"]));
        sessionStorage.setItem('email', this.userAuthForm.value.email);
        sessionStorage.setItem('password', this.userAuthForm.value.password);
        sessionStorage.setItem('subdomain', this.userAuthForm.value.subdomain);
        sessionStorage.setItem('maintained', 'false')
      }
      this.router.navigate(['tickets/'], { queryParams: { page: 1} })
    },
      error => {
        this.error = JSON.stringify(error.error.error);
        if(this.error == undefined){
          this.error = error.message;
        }
        this.connect = false;
        this.load = false;
        this.isError = true;
      });
  }
}

