import { UtilsService } from './../../utils/utils.service';
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

  auth: any = JSON.parse(this._utilsService.getLocalStorages('auth')!);

  nombre: string = '';
  foto: string = '../../../../assets/imgs/profile.png';

  subscription: Subscription;

  constructor(
    private _navbarService: NavbarService,
    private _utilsService: UtilsService
  ) {
    this.subscription = new Subscription();
  }
  ngOnInit(): void {
    this.nombre = this.auth.primerNombre + ' ' + this.auth.primerApellido;
    this.subscription = this._navbarService.title$.subscribe((newTitle) => {
      this.title = newTitle;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this._utilsService.logout();
  }
}
