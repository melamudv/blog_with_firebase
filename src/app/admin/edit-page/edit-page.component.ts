import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostServices} from '../../shared/post.services';
import {switchMap} from 'rxjs/operators';
import {Post} from '../shared/components/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  post: Post;
  submitted = false;
  uSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private postServices: PostServices,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap( (params: Params) => {
          return this.postServices.getById(params['id']);
        })).subscribe((post: Post) => {
            this.post = post;
            this.form = new FormGroup({
              title: new FormControl(post.title, Validators.required),
              text: new FormControl(post.text, Validators.required),
            });
    });
  }

  submit() {
    this.submitted = true;
    if(this.form.invalid){
      return
    }
    this.uSub = this.postServices.update({
        ...this.post,
        title: this.form.value.title,
        text: this.form.value.text
    }).subscribe(() => {
      this.submitted = false;
      this.alertService.danger('Post was updated');
    })
  }

  ngOnDestroy() {
    if(this.uSub){
      this.uSub.unsubscribe();
    }
  }
}
