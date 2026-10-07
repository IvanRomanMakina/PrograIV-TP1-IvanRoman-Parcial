import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-cartelera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartelera.component.html',
  styles: [`
    .cartelera-container { max-width: 1000px; margin: 30px auto; padding: 20px; color: #f8fafc; }
    .peliculas-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; }
    .pelicula-card { background: #1e293b; border-radius: 12px; padding: 15px; border: 1px solid #334155; display: flex; flex-direction: column; justify-content: space-between; }
    .pelicula-card h3 { margin-top: 0; color: #38bdf8; }
    button { background: #0284c7; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; }
    button:hover { background: #0369a1; }
  `]
})
export class CarteleraComponent implements OnInit {
  peliculas: any[] = [];
  cargando: boolean = true;
  mensaje: string = '';

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async ngOnInit() {
    await this.cargarPeliculas();
  }

  async cargarPeliculas() {
    try {
      const { data, error } = await this.supabaseService.client
        .from('peliculas') // Asegúrate de tener esta tabla en Supabase o ajústala según tu esquema
        .select('*');

      if (error) {
        this.mensaje = 'Error al cargar cartelera: ' + error.message;
        // Datos de respaldo simulados por si la tabla aún está vacía en Supabase para la defensa
        this.peliculas = [
          { id: 1, titulo: 'Inception', genero: 'Ciencia Ficción', duracion: '148 min' },
          { id: 2, titulo: 'Interstellar', genero: 'Aventura / Drama', duracion: '169 min' },
          { id: 3, titulo: 'The Batman', genero: 'Acción / Suspenso', duracion: '176 min' }
        ];
      } else {
        this.peliculas = data || [];
      }
    } catch (e) {
      this.mensaje = 'Error de conexión con la base de datos.';
    } finally {
      this.cargando = false;
    }
  }

  seleccionarPelicula(idPelicula: number) {
    // Redirige al mapa de asientos pasando el ID de la película/función
    this.router.navigate(['/asientos', idPelicula]);
  }
}