import { Component, OnInit } from '@angular/core';
import { ExpenseApiService } from '../services/expense-api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  signinForm: FormGroup;
  signupForm: FormGroup;
  loginform: boolean = true;
  constructor(private fb: FormBuilder, private apiservice: ExpenseApiService, private router: Router) {

    this.signinForm = this.fb.group({
      email: [null, [Validators.required]],
      password: ['', Validators.required]
    });
    this.signupForm = this.fb.group({
      username: [null,[Validators.required,Validators.pattern(/^[A-z0-9]*$/),Validators.minLength(3),]],
      email: [null, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required,Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ),
      Validators.minLength(8),]]

    });
  }

  toggleForm() {
    this.loginform = !this.loginform;
    this.signinForm.reset()
    this.signupForm.reset()
  }
  signIn() {
    var inputObj = {
      "email_id": this.signinForm.controls["email"].value,
      "user_password": this.signinForm.controls["password"].value,
    }
    this.apiservice.SignIn(inputObj).subscribe(result => {
      if (result.user_id != null) {
        sessionStorage.setItem('userId', result.user_id);
        this.router.navigate(['/summary']);

      } else {
        const ele = document.getElementsByClassName('err-msg') as HTMLCollectionOf<HTMLElement>;
        ele[0].textContent = "Incorrect email id or password.";
        setTimeout(() => {
          ele[0].textContent = "";
        }, 5000);
        //provided details not found
      }
    })
  }
  signUp() {
    var inputObj = {
      "email_id": this.signupForm.controls["email"].value,
      "user_password": this.signupForm.controls["password"].value,
      "full_name": this.signupForm.controls["username"].value,
    }
    this.apiservice.SignUp(inputObj).subscribe(result => {
      if (result) {
        if (result.status == 'Success') {
          const ele = document.getElementsByClassName('err-succ') as HTMLCollectionOf<HTMLElement>;
          ele[0].textContent = "Congratulations,Your account has been successfully created.";
         setTimeout(() => {
            ele[0].textContent = "";
            this.loginform = !this.loginform;
          this.signupForm.reset()
          }, 5000);
          
        } else {
          // Duplicate Email
          const ele = document.getElementsByClassName('err-msg') as HTMLCollectionOf<HTMLElement>;
          ele[0].textContent = "Given email id already exists.Please try a different email to signup or signin to your existing account. ";
          setTimeout(() => {
            ele[0].textContent = "";
          }, 5000);
        }
      }
    })
  }
}

