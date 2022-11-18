import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  userName: any;
  role: any;
  toggle: boolean;
  iconName: string;
  constructor(private route: Router) {
  
  } 

  ngOnInit() {
    if (localStorage.getItem('theme') == "dark") {
      this.toggle = true
      this.iconName = "sunny"
    } else {
      this.toggle = false
      this.iconName = "moon"

    }
    this.userName = localStorage.getItem('userName');
    this.role = localStorage.getItem('role');
    this.role = (this.role == "ROLE_ADMIN") ? "Admin" : "Employee"
  }

  onLogout() {
    let theme = localStorage.getItem('theme');
    localStorage.clear();
    localStorage.setItem('theme', theme)
    this.route.navigate(['/auth']);
  }

  toogleTheme(event) {

    if (event.detail.checked) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark')
      this.iconName = "sunny"
    }
    else {
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light')
      this.iconName = "moon"
    }
  }

  changePassword() {
    this.route.navigateByUrl("/tabs/change-password")
  }
}

