import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import * as firebase from "firebase";
import { NotificationService } from "../../shared/notification.service";
import { FirebaseService } from "../../shared/firebase.service";
import { UserService } from "../../shared/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  constructor(
    private notifier: NotificationService,
    private firedataserice: FirebaseService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}
  /**
   *
   * @param form
   */
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userData => {
        if (userData.user.emailVerified) {
          
          this.firedataserice.getUsersFromDatabase(userData.user.uid);
          
          this.userService.set(userData);
          console.log('data...'+userData);
          
          this.router.navigate(['/allposts']);

        } else {
          const message = `Your email ${email} is not yet verified`;
          this.notifier.display("error", message);

          firebase.auth().signOut();
        }
      })
      .catch(err => {
        this.notifier.display("error", err.message);
      });
  }
}
