import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false,
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
  ) { }

  get isLoading(): boolean { return this.loadingService.isLoading; }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['']
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.loadingService.setAppLoading(true);
      this.authService.registerUser(this.registerForm.value)
      .pipe(
        finalize(() => this.loadingService.setAppLoading(false))
      )
      .subscribe((response) => {
        console.log('@@@ response: ', response);
      });
    }
  }
}
