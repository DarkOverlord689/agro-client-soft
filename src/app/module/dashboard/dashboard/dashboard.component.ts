import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpImplService } from 'src/app/shared/services/impl/http-impl.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  /** Objeto que contiene la información climática. */
  clima: any;
  /** Entidad seleccionada para la consulta climática. */
  entidadSeleccionada: string = '';
  /** listado de fechas especiales */
  listFechasEspeciales: any[] = [];

  /** Niveles de humedad y viento. */
  humedad: number = 0;
  viento: number = 0;

  /** Temperaturas actual, mínima y máxima. */
  currentMin: number = 0;
  currentMax: number = 0;
  currentTemp: number = 0;

  /** Fecha actual. */
  fechaActual: Date = new Date();

  /** Mapeo de nombres de meses. */
  jsonMes: any = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre',
  };

  /** Nombres abreviados de días de la semana. */
  day: string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  /** Información de los días de la semana. */
  days: any[] = [];

  /** Nombre completo del usuario. */
  nombreCompleto: string = 'Luis valencia';

  /** Cantidad de notificaciones. */
  cantidadNotificaciones: number = 0;

  /** Fecha formateada a (sabado, 6 de enero de 2024) */
  options: any = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  fecha: any = new Date();
  fechaFormateada = this.fecha.toLocaleDateString('es-ES', this.options);

  /**
   * Constructor del componente.
   * @constructor
   * @param {HttpService} _httpService - Servicio HTTP para realizar peticiones.
   * @param {HttpImplService} _httpImplService - Implementación concreta del servicio HTTP.
   * @param {UtilsService} _utilsService - Servicio de utilidades compartidas.
   * @param {NavbarService} navbarService - Servicio de la barra de navegación.
   */
  constructor(
    private _httpService: HttpService,
    private _httpImplService: HttpImplService,
    public _utilsService: UtilsService,
    public router: Router
  ) { }

  /**
   * Inicialización del componente.
   * @async
   * @method
   */
  async ngOnInit() {
    // Establecer la URL de la API climática
    this._httpService.apiUrl = 'http://api.weatherapi.com/v1/forecast.json';
    await this.getClima();

    // Ejemplo de uso: Obtener días de la semana para el mes actual
    const year = new Date().getFullYear();
    const month = new Date().getMonth(); // Enero (los meses comienzan desde 0 en JavaScript)
    this.days = this._utilsService.assignDaysToWeekdays(year, month);
    // this.initMap();

    // setInterval(() => {
    //   this.cantidadNotificaciones = Number(
    //     this._utilsService.getLocalStorages('notificaciones')
    //   );
    // }, 0);
  }

  // METODOS
  // initMap(): void {
  //   const map = new google.maps.Map(
  //     document.getElementById("mapa") as HTMLElement,
  //     {
  //       zoom: 13,
  //       center: { lat: 34.04924594193164, lng: -118.24104309082031 },
  //     }
  //   );

  //   const trafficLayer = new google.maps.TrafficLayer();

  //   trafficLayer.setMap(map);
  // }

  /**
   * Realiza una solicitud para obtener la información climática.
   * @async
   * @method
   */
  async getClima() {
    // Realizar solicitud HTTP
    await this._httpImplService
      .obtener(
        `?key=ab5b9967d7284f0aa91151814241501&q=${'BARR'}&days=5&aqi=no&alerts=no`
      )
      .then((value: any) => {
        console.log('sasdsa' + value);
        // Actualizar propiedades con la respuesta de la solicitud
        this.clima = value;
        this.viento = value.current.wind_kph;
        this.humedad = value.current.humidity;

        this.currentMin = value.forecast.forecastday[0].day.mintemp_c;
        this.currentMax = value.forecast.forecastday[0].day.maxtemp_c;
        this.currentTemp = value.current.temp_c;
      })
      .catch((reason: any) => {
        console.log(reason);
      });
  }


  async getFechasEspeciales() {
    this._httpService.apiUrl = environment.url;
    await this._httpImplService.obtener("list")
      .then((value: any) => {
        this.listFechasEspeciales = value;
      }).catch((reason) => {
        console.log(reason);
      })
  }
}
