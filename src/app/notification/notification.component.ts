import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  type:string = null; 
  message:string = null; 

  constructor(notifier:NotificationService) { 
    notifier.emitter.subscribe(
      data =>{
        this.type = data.type; 
        this.message = data.message;
        this.reset();
      }
    );
  }

  ngOnInit() {
  }
  /**
   * reset the message and type
   */
  reset(){
    setTimeout(() => {
      this.message = null; 
      this.type = null
    }, 6000);
  }

}
