import { NavbarService } from './../../services/navbar.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  title: string = 'Dashboard';

  nombre: string = 'Luis Valencia';
  perfil: string = 'Local';
  foto: string = '../../../../assets/imgs/profile.png';

  subscription: Subscription;

  constructor(private _navbarService: NavbarService) {
    this.subscription = new Subscription();
  }
  ngOnInit(): void {
    this.subscription = this._navbarService.title$.subscribe((newTitle) => {
      this.title = newTitle;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {}
}
