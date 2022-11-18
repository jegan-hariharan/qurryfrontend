import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss'],
})
export class BrandingComponent implements OnInit {
  @Input() headerTitle:string="";
  @Input() showBackButton:boolean=false;
  
  constructor() { }

  ngOnInit() {

  }

  
}
