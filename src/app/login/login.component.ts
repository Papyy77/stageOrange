import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  signup: FormGroup;
  text = "Connexion";
  show = "login";
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private user: UserService) {
    this.form = this.fb.group({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    this.signup = this.fb.group({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
    });
  }
  ngOnInit(): void {
    
  }

  change() {
    if(this.show === "login") {
      this.text = "Inscription";
      this.show = "signup";
    } else {
      this.text = "Connexion";
      this.show = "login";
    }
  }

  async login() {
    if(this.loading) {
      return;
    }
    console.log('login::::', this.form.value);
    this.loading = true;
    try {
      const res: any = await this.user.login(this.form.value).toPromise();
      console.log('res:::::', res);
      this.signup.reset();
      if(res.data){
        localStorage.setItem('user', JSON.stringify(res.data));
        this.router.navigateByUrl("/quiz");
      } else {
        alert('utilisateur non trouve');
      }
    } catch(error) {
      console.log('there is an error::::');
    } finally {
      this.loading = false;
    }
    
  }

  async sign() {
    console.log('data:::::', this.signup.value);
    try {
      const res = await this.user.signup(this.signup.value).toPromise();
      console.log('res:::::', res);
      this.signup.reset();
      alert("compte creer avec succes")
      this.show = "login";
    } catch(error) {
      console.log('there is an error::::');

    }
  }
}
