import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../shared/firebase.service';
import { NotificationService } from '../shared/notification.service';
import *as firebase from 'firebase';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit, OnDestroy{
  personalPostRef:any;
  postList:any = []; 


  constructor(private fireService:FirebaseService, private notifier:NotificationService) { }

  ngOnInit() {
    var uid = firebase.auth().currentUser.uid;
    this.personalPostRef = this.fireService.getUserPostsRef(uid); 
    this.personalPostRef.on('child_added', data =>{
      this.postList.push({
        key:data.key,
        data:data.val()
      });
    });
    
  }

  onFileSelection(event){
    const fileList:FileList = event.currentTarget.files;
    if(fileList.length >0){
      const file:File = fileList[0];
      this.fireService.uploadFile(file).then(data =>{
        console.log("test2..."+data);
        this.notifier.display('success','Pictures Successfully uploaded');
        this.fireService.handleImageUpload(data);
        
        
        
        
      }).catch(err =>{
        console.log(err);
        
        this.notifier.display('error',err.message);
      })
    }





  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.personalPostRef.off();
  }

}
