import { Component, OnInit, OnDestroy } from "@angular/core";

import * as firebase from "firebase";
import _ from 'lodash';

@Component({
  selector: "app-all-posts",
  templateUrl: "./all-posts.component.html",
  styleUrls: ["./all-posts.component.css"]
})
export class AllPostsComponent implements OnInit, OnDestroy {
  all: any = [];
  allRef: any;
  loadMoreRef:any;
  constructor() {}

  ngOnInit() {
    this.allRef = firebase
      .database()
      .ref("allposts")
      .limitToFirst(4);
    this.allRef.on("child_added", data => {
      this.all.push({
        key: data.key,
        data: data.val()
      });
    });
  }
  
  onLoadMore() {
    if (this.all.length > 0) {
      const lastLoadedPost = _.last(this.all);
      const lastLoadedPostKey = lastLoadedPost.key;

      this.loadMoreRef = firebase
        .database()
        .ref("allposts")
        .startAt(null, lastLoadedPostKey)
        .limitToFirst(4 + 1);
      this.loadMoreRef.on("child_added", data => {
        if (data.key === lastLoadedPostKey) {
          return;
        } else {
          this.all.push({
            key: data.key,
            data: data.val()
          });
        }
      });
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.allRef.off();
  }
}
