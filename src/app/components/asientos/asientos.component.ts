import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-asientos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asientos.component.html',
  styles: [`
    .asientos-container { max-width: 800px; margin: 0 auto; padding: 20px; color: #f8fafc; text-align: center; }
    .pantalla { background: #334155; padding: 10px; border-radius: 4px; margin-bottom: 30px; font-weight: bold; letter-spacing: 2px; color: #38bdf8; }
    .sala-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; justify-content: center; margin-bottom: 30px; }
    .asiento { background: #1e293b; border: 1px solid #334155; padding: 12px; border-radius: 6px; cursor: pointer; color: #f8fafc; font-weight: bold; transition: all 0.2s; }
    .asiento:hover:not(.ocupado) { background: #0284c7; border-color: #38bdf8; }
    .asiento.seleccionado { background: #16a34a; border-color: #22c55e; }
    .asiento.ocupado { background: #ef4444; border-color: #dc2626; cursor: not-allowed; opacity: 0.6; }
    .leyenda { display: flex; justify-content: center; gap: 20px; margin-bottom: 20px; font-size: 14px; }
    .item-leyenda { display: flex; align-items: center; gap: 8px; }
    .color-box { width: 16px; height: 16px; border-radius: 4px; }
    .btn-confirmar { background: #0284c7; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 16px; }
    .btn-confirmar:hover { background: #0369a1; }
    .btn-confirmar:disabled { background: #475569; cursor: not-allowed; }
  `]
})
export class AsientosComponent implements OnInit {
  idPelicula: string | null = null;
  asientos: any[] = [];
  cargando: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    this.idPelicula = this.route.snapshot.paramMap.get('id');
    await this.cargarAsientosDeSala();
  }

  async cargarAsientosDeSala() {
    const listaTemporal = [];
    for (let i = 1; i <= 24; i++) {
      listaTemporal.push({
        id: i,
        numero: `A${i}`,
        estado: (i === 5 || i === 12 || i === 18) ? 'ocupado' : 'disponible',
        seleccionado: false
      });
    }
    this.asientos = listaTemporal;
  }

  toggleAsiento(asiento: any) {
    if (asiento.estado === 'ocupado') return;
    asiento.seleccionado = !asiento.seleccionado;
  }

  get haySeleccionados(): boolean {
    return this.asientos.some(a => a.seleccionado);
  }

  async confirmarReserva() {
    if (!this.haySeleccionados) return;

    this.cargando = true;

    try {
      // 1. Verificamos si hay un usuario autenticado en la sesión actual
      const { data: { user }, error: userError } = await this.supabaseService.client.auth.getUser();

      if (userError || !user) {
        alert('Debes iniciar sesión para poder confirmar la reserva de tus asientos.');
        this.router.navigate(['/login']);
        return;
      }

      const asientosSeleccionados = this.asientos
        .filter(a => a.seleccionado)
        .map(a => a.numero);

      // 2. Guardamos la reserva vinculando el ID del usuario autenticado
      const { error } = await this.supabaseService.client
        .from('reservas')
        .insert([
          { 
            user_id: user.id, 
            pelicula_id: this.idPelicula, 
            asientos: asientosSeleccionados, 
            fecha: new Date() 
          }
        ]);

      if (error) throw error;

      alert(`¡Reserva confirmada con éxito para los asientos: ${asientosSeleccionados.join(', ')}!`);
      this.router.navigate(['/reportes']);
    } catch (error: any) {
      console.error('Error al guardar reserva:', error);
      alert('Hubo un error al registrar la reserva en la base de datos.');
    } finally {
      this.cargando = false;
    }
  }
}
