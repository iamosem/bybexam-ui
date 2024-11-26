import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get isLoading(): boolean { return this.loadingService.isLoading; }

  login() {
    if (this.loginForm.valid) {
      this.loadingService.setAppLoading(true);
      this.authService.loginUser(this.loginForm.value)
      .pipe(
        finalize(() => this.loadingService.setAppLoading(false))
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
      });
    }
  }
}
