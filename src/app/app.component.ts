import { Component, OnInit } from "@angular/core";
import * as firebase from 'firebase'

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";

  ngOnInit() {
    const config = {
      apiKey: "AIzaSyBa__tYUhpr08mApquCm83d74giYRb-12M",
      authDomain: "projectsms-66114.firebaseapp.com",
      databaseURL: "https://projectsms-66114.firebaseio.com",
      projectId: "projectsms-66114",
      storageBucket: "projectsms-66114.appspot.com",
      messagingSenderId: "156203798026"
    };
    firebase.initializeApp(config);
  }
}
