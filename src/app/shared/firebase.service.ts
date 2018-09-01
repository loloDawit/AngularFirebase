import * as firebase from "firebase";
import { UserService } from "./user.service";
import { Injectable } from "@angular/core";
import { isRejected, reject } from "q";

@Injectable()
export class FirebaseService {
  constructor(private user: UserService) {}
  /**
   *
   * @param uid user id to retrive users from the database
   */
  getUsersFromDatabase(uid) {
    const ref = firebase.database().ref("users/" + uid);
    return ref.once("value").then(snapshot => snapshot.val());
  }
  /**
   * generate unique filename
   */
  generateRandomName() {
    let text = "";
    const possible = "ABCDEFfedcba1234567890";

    for (let i = 0; i < 4; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  /**
   *
   * @param file
   */
  uploadFile(file) {
    const filename = this.generateRandomName();
    const fileRef = firebase
      .storage()
      .ref()
      .child("image/" + filename);
    const uploadTask = fileRef.put(file);

    const name = filename;

    return new Promise((resolve, reject) => {
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        // three observers
        // 1.) state_changed observer
        snapshot => {
          // upload in progress
          var progress =
            (uploadTask.snapshot.bytesTransferred /
              uploadTask.snapshot.totalBytes) *
            100;
          console.log(progress);
        },
        // 2.) error observer
        error => {
          // upload failed
          console.log(error);
          reject(error);
        },
        // 3.) success observer
        (): any => {
          const url = uploadTask.snapshot.ref.getDownloadURL().then(url => {
            console.log("testing url..." + url);

            resolve({ name, url });
          });
        }
      );
    });
  }
  handleImageUpload(data) {
    var userData = this.user.getProfile();
    console.log("testing..." + userData.user.uid);

    var newPersonalPostKey = firebase
      .database()
      .ref()
      .child("myposts")
      .push().key;

    var allPostKey = firebase
      .database()
      .ref("allposts")
      .push().key;

    // var imageKey = firebase
    //   .database()
    //   .ref("images")
    //   .push().key;

    var allPostsDetails = {
      fileUrl: data.url,
      name: data.name,
      creationDate: new Date().toString(),
      uploadedBy: {
        email: userData.user.email
      }
    };
    var personalPostDetails = {
      fileUrl: data.url,
      name: data.name,
      creationDate: new Date().toString()
    };
    var imageDetails = {
      fileUrl: data.url,
      name: data.name,
      creationDate: new Date().toString(),
      favoriteCount: 0
    };

    var updates = {};
    updates[
      "/myposts/" + userData.user.uid + "/" + newPersonalPostKey
    ] = personalPostDetails;
    updates["/allposts/" + allPostKey] = allPostsDetails;
    updates["/images/" + data.name] = imageDetails;

    return firebase
      .database()
      .ref()
      .update(updates);
  }
  /**
   * 
   * @param uid 
   */
  getUserPostsRef(uid){
    return firebase.database().ref('myposts').child(uid);
  }
}
