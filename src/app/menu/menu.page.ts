import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  quarryName: any;
  quarryId: any;
  role: any;

  constructor(private router: Router) {
   }

  ngOnInit() {
    this.quarryName = localStorage.getItem('quarryName');
    this.quarryId = localStorage.getItem('quarryId');
    this.role = localStorage.getItem('role');
  }

  onMenuClick(url: any) {
    console.log(url);
    this.router.navigate([url],{ queryParams: { quarryId : this.quarryId } });  
  }

}
