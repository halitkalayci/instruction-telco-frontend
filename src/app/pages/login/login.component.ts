import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required],
    });
  }
  login() {
    if (!this.loginForm.valid) {
      this.toastr.error('Lütfen tüm alanları kontrol ediniz..');
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        this.localStorage.set('token', response.access_token);
        this.router.navigateByUrl('/homepage');
      },
      (errorResponse) => {
        this.toastr.error(errorResponse.error.message);
      }
    );
  }
}
