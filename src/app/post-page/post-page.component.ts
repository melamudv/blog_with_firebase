import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostServices} from '../shared/post.services';
import {Observable} from 'rxjs';
import {Post} from '../admin/shared/components/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post>;
  constructor(private route: ActivatedRoute, private postServices: PostServices) { }

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap(params => {
        return this.postServices.getById(params['id']);
      })
    );
  }

}
