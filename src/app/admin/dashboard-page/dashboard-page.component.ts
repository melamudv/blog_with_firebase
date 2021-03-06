import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostServices} from '../../shared/post.services';
import {Subscription} from 'rxjs';
import {Post} from '../shared/components/interfaces';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';
  constructor(private  postServices: PostServices, private alertService: AlertService) { }

  ngOnInit(): void {
    this.pSub = this.postServices.getAll().subscribe( posts =>{
      this.posts = posts;
    });
  }
  remove(id: string) {
    this.dSub = this.postServices.remove(id).subscribe(() => {
      this.posts = this.posts.filter( post => post.id !== id);
      this.alertService.warning('Post was deleted');
    });
  }

  ngOnDestroy() {
    if(this.pSub){
      this.pSub.unsubscribe();
    }
    if(this.dSub) {
      this.dSub.unsubscribe();
    }
  }

}
