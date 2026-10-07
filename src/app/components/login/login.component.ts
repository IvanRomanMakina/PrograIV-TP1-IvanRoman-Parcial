import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: [`
    .login-container { max-width: 400px; margin: 40px auto; background: #1e293b; padding: 30px; border-radius: 10px; border: 1px solid #334155; color: #f8fafc; }
    h2 { text-align: center; color: #38bdf8; margin-bottom: 25px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-size: 14px; color: #94a3b8; }
    input { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #f8fafc; font-size: 14px; box-sizing: border-box; }
    input:focus { outline: none; border-color: #38bdf8; }
    .btn-submit { width: 100%; background: #0284c7; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 16px; margin-top: 10px; }
    .btn-submit:hover { background: #0369a1; }
    .btn-submit:disabled { background: #475569; cursor: not-allowed; }
    .error-msg { color: #ef4444; font-size: 12px; margin-top: 5px; display: block; }
    .links-footer { text-align: center; margin-top: 20px; font-size: 14px; color: #94a3b8; }
    .links-footer a { color: #38bdf8; text-decoration: none; }
    .links-footer a:hover { text-decoration: underline; }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    try {
      const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      alert('¡Inicio de sesión exitoso!');
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Error al iniciar sesión. Verifica tus credenciales.';
    }
  }
}