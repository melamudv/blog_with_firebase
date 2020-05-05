import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/components/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  subbmited = false;
  message: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['loginAgain']){
        this.message = 'Please Enter credential';
      }
      else if(params['authFailed']){
        this.message = 'Session has over please login';
      }
    })
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit() {
    this.subbmited = true;
    if(this.form.invalid){
      return
    }
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.subbmited = false;
    }, () => {
      this.subbmited = false;
    });
  }
}
