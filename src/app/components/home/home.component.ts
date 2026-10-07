// src/app/components/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LISTA_PELICULAS, Pelicula } from '../../peliculas.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styles: [`
    .home-container { max-width: 1100px; margin: 0 auto; padding: 20px; color: #f8fafc; }
    .navbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 1px solid #334155; padding-bottom: 20px; }
    .logo { font-size: 24px; font-weight: bold; color: #38bdf8; }
    .nav-links a { background: #334155; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; margin-left: 10px; font-weight: bold; }
    .nav-links a:hover { background: #475569; }
    .cartelera-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
    .pelicula-card { background: #1e293b; border: 1px solid #334155; border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s; }
    .pelicula-card:hover { transform: translateY(-5px); border-color: #38bdf8; }
    .pelicula-img { width: 100%; height: 320px; object-fit: cover; background: #0f172a; display: block; }
    .pelicula-info { padding: 15px; display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between; }
    .pelicula-info h3 { margin: 0 0 5px 0; font-size: 18px; color: #f8fafc; }
    .pelicula-info p { margin: 0 0 15px 0; font-size: 13px; color: #94a3b8; }
    .btn-asientos { background: #16a34a; color: white; text-align: center; padding: 10px; border-radius: 6px; text-decoration: none; font-weight: bold; }
    .btn-asientos:hover { background: #15803d; }
  `]
})
export class HomeComponent {
  peliculas: Pelicula[] = LISTA_PELICULAS;
}