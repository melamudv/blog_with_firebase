import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Subscription} from 'rxjs';
import {Toast} from 'materialize-css';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;
  text: string;
  type = 'success';
  alertSub: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSub = this.alertService.alert$.subscribe( alert => {
      this.text = alert.text;
      this.type = alert.type;
      this.callToToast();

      const timeout = setTimeout( () =>{
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    });


  }

  callToToast() {
    new Toast({
      html: this.text,
      classes: this.type,
      displayLength: this.delay
    });
  }
  ngOnDestroy() {
    if(this.alertSub){
      this.alertSub.unsubscribe();
    }
  }

}
