import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reportes.component.html',
  styles: [`
    .reportes-container { max-width: 900px; margin: 0 auto; padding: 20px; color: #f8fafc; }
    .header-reportes { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .metric-card { background: #1e293b; border: 1px solid #334155; padding: 20px; border-radius: 10px; text-align: center; }
    .metric-card h3 { margin: 0; color: #94a3b8; font-size: 14px; text-transform: uppercase; }
    .metric-card p { font-size: 28px; font-weight: bold; color: #38bdf8; margin: 10px 0 0 0; }
    .tabla-container { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 20px; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th, td { padding: 12px; border-bottom: 1px solid #334155; font-size: 14px; }
    th { color: #38bdf8; }
    .btn-volver { background: #334155; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; text-decoration: none; }
    .btn-volver:hover { background: #475569; }
  `]
})
export class ReportesComponent implements OnInit {
  totalUsuarios: number = 0;
  totalReservas: number = 0;
  usuarios: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.cargarDatosReporte();
  }

  async cargarDatosReporte() {
    try {
      // Obtenemos los perfiles de la tabla de usuarios/perfiles en Supabase
      const { data: perfiles, error } = await this.supabaseService.client
        .from('perfiles') // Asegúrate de que el nombre de tu tabla en Supabase sea este
        .select('*');

      if (error) throw error;

      if (perfiles) {
        this.usuarios = perfiles;
        this.totalUsuarios = perfiles.length;
      }

      // Opcional: Obtener total de reservas si creaste la tabla 'reservas'
      const { count, error: errorReservas } = await this.supabaseService.client
        .from('reservas')
        .select('*', { count: 'exact', head: true });

      if (!errorReservas && count !== null) {
        this.totalReservas = count;
      }
    } catch (error) {
      console.error('Error al cargar reportes desde Supabase, usando respaldo local:', error);
      // Datos de respaldo por si la tabla remota está vacía o pendiente
      this.totalUsuarios = 1;
      this.totalReservas = 3;
      this.usuarios = [
        { nombre: 'Ivan Roman', email: 'ivan@example.com', tipo_sangre: 'O+', color_ojos: 'Marrones', dias_vacaciones: 14 }
      ];
    }
  }
}