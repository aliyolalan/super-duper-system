import { Component, OnInit } from '@angular/core';
import {
  faUsers,
  faBriefcase,
  faBars,
  faHandPointRight,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faUsers = faUsers;
  faBriefcase = faBriefcase;
  faBars = faBars;
  faHandPointRight = faHandPointRight;
  faRightFromBracket = faRightFromBracket;

  constructor(private routerService: Router) {}

  ngOnInit(): void {}

  logOutFunction() {
    sessionStorage.removeItem('user');
    this.routerService.navigate(['/']);
  }
}
