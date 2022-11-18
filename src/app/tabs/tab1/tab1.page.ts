import { AlertController, IonSlides, ModalController, Platform } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private fb:FormBuilder, private route: ActivatedRoute, private router: Router) {
  
  } 

  ngOnInit() {
  }
}

