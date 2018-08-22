import { Component, OnInit } from '@angular/core';
import *as firebase from "firebase"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false

  constructor() { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((userdata)=>{
      // we are ok, and logged in
      if(userdata && userdata.emailVerified){
        this.isLoggedIn = true
      }else{
        this.isLoggedIn = false
      }
    });
  }

}
