import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUser } from '../models/iuser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClient,
    private toastrService: ToastrService,
    private routerService: Router
  ) {}

  userForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(this.userForm.value.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.userForm.value.password, [
        Validators.required,
      ]),
    });
  }

  // GET Methods...
  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  loginFunction() {
    const email = this.email?.value;
    const password = this.password?.value;

    const URL = 'https://www.jsonbulut.com/json/userLogin.php';
    const sendParameters = {
      ref: 'c7c2de28d81d3da4a386fc8444d574f2',
      userEmail: email,
      userPass: password,
      face: 'no',
    };

    // Sending Data...
    const newThis = this;
    this.httpService.get<IUser>(URL, { params: sendParameters }).subscribe({
      next(res) {
        const user = res.user[0];
        const userStatus = user.durum;
        const userMessage = user.mesaj;

        if (userStatus === true) {
          // Login is successful...
          const userInformation = user.bilgiler;
          newThis.toastrService.success(userMessage, 'Giriş Başarılı');

          if (userInformation) {
            const stringfyToUserInfos = JSON.stringify(userInformation);
            sessionStorage.setItem('user', stringfyToUserInfos);
            newThis.routerService.navigate(['/admin']);
          }
        } else {
          // Login is unsuccessful...
          newThis.toastrService.clear();
          newThis.toastrService.error(userMessage, 'Hata');
        }
      },
      error(err) {
        console.log(err.message);
      },
    });
  }
}
