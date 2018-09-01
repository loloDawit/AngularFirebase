import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  name: string;
  uid: string;
  email: string;

  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(userdata => {
      // we are ok, and logged in
      if (userdata && userdata.emailVerified) {
        this.isLoggedIn = true;
        const userData = this.userservice.getProfile();
        console.log(userData);
        console.log(userData.user.uid);
        console.log(userData.user.email);
        console.log(userData.user.uid);
        this.name = userData.user.name;
        this.email = userData.user.email;
        this.uid = userData.user.uid;

        this.router.navigate(["/myposts"]);
      } else {
        this.isLoggedIn = false;
        firebase.auth().signOut();
      }
    });
  }
  onLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.userservice.destroy();
        this.isLoggedIn = false;
      });
  }
}
