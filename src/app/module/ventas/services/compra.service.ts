import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IVentas } from '../models/IVentas.interface';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  compraSubject: BehaviorSubject<IVentas[]> = new BehaviorSubject<IVentas[]>(
    []
  );
  compra$: Observable<IVentas[]> = this.compraSubject.asObservable();

  addCompra(venta: IVentas) {
    const compraActual: IVentas[] = this.compraSubject.getValue();

    let existe: boolean = false;
    compraActual.forEach((value: IVentas) => {
      if (value.id == venta.id) {
        this.addCantidad(venta.id, 1, false);
        existe = true;
      }
    });
    if (!existe) {
      compraActual.push(venta);
      this.compraSubject.next(compraActual);
    }
  }

  addCantidad(producto: number, cantidad: number, disminuir: boolean) {
    let compraActual: IVentas[] = this.compraSubject.getValue();

    let cantidadBase = 0;
    compraActual = compraActual
      .map((value: IVentas) => {
        cantidadBase = value.cantidad;
        if (value.id == producto) {
          console.log('Es igual: ' + cantidadBase);

          if (disminuir) {
            cantidadBase -= cantidad;
          } else {
            cantidadBase += cantidad;
          }
          console.log('cantidad final: ' + cantidadBase);

          return {
            ...value,
            cantidad: cantidadBase,
          };
        }
        return value;
      })
      .filter((element: IVentas) => element.cantidad > 0);
    this.compraSubject.next(compraActual);
  }

  eliminarProducto(producto: number) {
    let compraActual: IVentas[] = this.compraSubject.getValue();

    compraActual = compraActual.filter((value) => value.id != producto);

    this.compraSubject.next(compraActual);
  }
}
