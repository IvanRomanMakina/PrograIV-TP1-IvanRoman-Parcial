import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  mensaje: string = '';

  constructor(private fb: FormBuilder, private supabaseService: SupabaseService) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      tipo_sangre: ['', Validators.required],
      color_ojos: ['', Validators.required],
      dias_vacaciones: [0, [Validators.required, Validators.min(0)]]
    });
  }

  async registrar() {
    if (this.registroForm.invalid) return;

    const val = this.registroForm.value;

    // 1. Crear usuario en Auth de Supabase
    const { data: authData, error: authError } = await this.supabaseService.client.auth.signUp({
      email: val.email,
      password: val.password
    });

    if (authError) {
      this.mensaje = 'Error en registro: ' + authError.message;
      return;
    }

    if (authData.user) {
      // 2. Guardar datos extendidos en la tabla profiles
      const { error: profileError } = await this.supabaseService.client
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            email: val.email,
            nombre: val.nombre,
            apellido: val.apellido,
            fecha_nacimiento: val.fecha_nacimiento,
            tipo_sangre: val.tipo_sangre,
            color_ojos: val.color_ojos,
            dias_vacaciones: val.dias_vacaciones,
            rol: 'cliente',
            puntos: 0,
            credito_favor: 0.00
          }
        ]);

      if (profileError) {
        this.mensaje = 'Error al guardar perfil: ' + profileError.message;
      } else {
        this.mensaje = '¡Registro exitoso! Ya puedes iniciar sesión y recibir tu beneficio de primera compra.';
      }
    }
  }
}