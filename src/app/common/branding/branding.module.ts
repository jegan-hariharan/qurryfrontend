import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandingComponent } from './branding.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
 declarations: [BrandingComponent],
 exports: [BrandingComponent]
})
export class BrandingModule { }
