import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Bilgiler } from 'src/app/models/iuser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;

  user: Bilgiler = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: '',
  };

  constructor(private routerService: Router) {
    const getItemSessionStorage = sessionStorage.getItem('user');

    if (getItemSessionStorage) {
      try {
        this.user = JSON.parse(getItemSessionStorage);
      } catch (error) {
        sessionStorage.removeItem('user');
        this.routerService.navigate(['/']);
      }
    } else {
      this.routerService.navigate(['/']);
    }
  }

  ngOnInit(): void {}
}
