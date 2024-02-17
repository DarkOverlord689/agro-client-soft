import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private titleSubject = new BehaviorSubject<string>(''); // Inicializado con un valor vacío
  title$ = this.titleSubject.asObservable();

  constructor() {
    // Emite el valor inicial después de un pequeño retraso
    setTimeout(() => {
      this.setTitle(localStorage.getItem('titleNavbar') || 'Default Title');
    });
  }

  setTitle(newTitle: string): void {
    this.titleSubject.next(newTitle);
    localStorage.setItem('titleNavbar', newTitle);
  }
}
