import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'app-main',
  template: `
    <section class="contenedor">
      <div class="sidebar">
        <aside class="contenedor__sidebar">
          <app-sidebar></app-sidebar>
        </aside>
      </div>
      <main class="contendor__main">
        <app-navbar></app-navbar>
        <router-outlet></router-outlet>
      </main>
    </section>
  `,
  styles: [
    `
      section.contenedor {
        position: relative;
        width: 100%;
        display: flex;
        gap: 19px;
        //   background: #eaeaea;
        padding: 1rem;

        .sidebar {
          max-width: 18rem;
          min-width: 4rem;
          min-height: 50rem;
          height: 100%;
        }
        aside.contenedor__sidebar {
          max-width: 18rem;
          min-width: 4rem;
          min-height: 50rem;
          height: 100%;
        }

        main.contendor__main {
          flex: 1;
          // background-color: #eaeaea;
          min-height: 100vh;
          padding: 19px 19px 19px 19px;

          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      }
    `,
  ],
})
export class MainComponent implements OnInit{
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _navbarService: NavbarService
  ) {
  }
  ngOnInit(): void {
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      // Accede a los datos asociados con la ruta actual
      const title = this.activatedRoute.snapshot.firstChild?.data['title'];
      this._navbarService.setTitle(title);
    });
  }
}
