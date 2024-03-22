import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
// import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { number } from 'echarts';

let eventGuid = 0;

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  // Contructor
  constructor(private router: Router) {}

  /**
   * @author  Gabriel Piedra
   * @date 2023-10-15
   * @description  El método getLocalStorage(key: string) devuelve el valor de la key que esta en el localStorage
   */
  getLocalStorages(key: string): string | null {
    return localStorage.getItem(key) || null;
  }

  /**
   * @author  Gabriel Piedra
   * @date 2023-10-15
   * @description  El método setLocalStorage(key: string, elemento: any) guarda en el localStorage la key y el valor.
   */
  setLocalStorages(key: string, elemento: any): void {
    localStorage.setItem(key, elemento);
  }

  /**
   * @author  Gabriel Piedra
   * @date 2023-10-15
   * @description  El método clearToken(buscar: string) borra del localStorege la key que se pase.
   */
  clearToken(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * @author  Gabriel Piedra
   * @date 2023-10-15
   * @description  El método decodeToken(key: string) decodifica con la key
   */
  decodeToken<T>(key: string): T | null {
    const elemento = this.getLocalStorages(key);
    return jwtDecode(elemento!) || null;
  }

  decode<T>(key: string): T | null {
    return jwtDecode(key!) || null;
  }

  // private AES_SECRET_KEY = 'carlos';
  // public decrypt(encryptedText: any): any {
  //   try {
  //     var bytes = CryptoJS.AES.decrypt(encryptedText, this.AES_SECRET_KEY);
  //     // bytes.toString(CryptoJS.enc.Utf8)
  //     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //   } catch (e) {
  //     // var bytes  = CryptoJS.AES.decrypt(encryptedText, this.AES_SECRET_KEY);
  //     // return bytes.toString(CryptoJS.enc.Utf8);
  //   }
  // }
  // public encrypt(encryptedText: any) {
  //   const dataString =
  //     typeof encryptedText == 'string'
  //       ? encryptedText
  //       : JSON.stringify(encryptedText);
  //   return CryptoJS.AES.encrypt(dataString, this.AES_SECRET_KEY).toString();
  // }

  /**
   * Formatea una fecha en formato 'YYYY-MM-DD'.
   * @param date La fecha a formatear.
   * @returns La fecha formateada en formato 'YYYY-MM-DD'.
   */
  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  /**
   * Formatea una fecha en el formato "31 dic 2024".
   * @param {Date} fecha - Objeto Date a formatear.
   * @returns {string} - Fecha formateada en el formato deseado.
   */
  formatearFecha(fecha: string | Date): string {
    // Convertir la fecha a un objeto moment
    const fechaMoment = moment(fecha);

    // Utilizar el objeto moment para formatear la fecha y devolver la cadena resultante
    return fechaMoment.format('DD MMM YYYY'); // Puedes ajustar el formato según tus preferencias
  }

  formatearFechaEspecials(fecha: string) {
    let options: any = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return new Date(fecha).toLocaleDateString('es-ES', options);
  }

  obtenerNumeroMesSeleccionado(mes: any): number | null {
    if (mes) {
      // La función getMonth() devuelve un número de 0 a 11, donde 0 es enero y 11 es diciembre
      return mes.getMonth() + 1; // Sumamos 1 para que los meses sean del 1 al 12
    } else {
      return null; // O maneja de otra manera el caso en que no se haya seleccionado ningún mes
    }
  }

  /**
   * Calcula y devuelve el progreso en base a dos fechas.
   *
   * @param fechaInicial - La fecha inicial del intervalo.
   * @param fechaFinal - La fecha final del intervalo.
   * @returns El progreso calculado en porcentaje (entre 0 y 100).
   */
  calcularProgreso(
    fechaInicial: any,
    fechaFinal: any,
    fecha_listo?: any
  ): number {
    fechaInicial = moment(fechaInicial);
    fechaFinal = moment(fechaFinal);

    if (fecha_listo) {
      // Comparación de fechas
      if (moment(fecha_listo).isBefore(fechaFinal)) {
        // console.log('La fecha 1 es anterior a la fecha 2.');
        return 100;
      } else if (moment(fecha_listo).isSame(fechaFinal)) {
        // console.log('Las fechas son iguales.');
        return 100;
      } else {
        return 101;
      }
    }
    let fechaActual: any = this.formatDate(new Date()); // Obtener la fecha actua
    fechaActual = moment(fechaActual);

    // Calcular el progreso en base a las fechas
    const progreso =
      ((fechaActual.valueOf() - fechaInicial.valueOf()) /
        (fechaFinal.valueOf() - fechaInicial.valueOf())) *
      100;

    // Asegurarse de que el progreso esté en el rango [0, 100]
    return Math.max(0, Math.min(1000, progreso));
  }

  // Función para obtener el día de la semana en base a la fecha
  obtenerDiaSemana(fecha: string | Date): string {
    fecha = new Date(fecha);
    // Días de la semana en formato texto
    const diasSemana = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];

    // Obtener el número del día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
    const numeroDia = fecha.getDay();

    // Obtener el nombre del día de la semana
    const nombreDia = diasSemana[numeroDia];

    return nombreDia;
  }
  getDaysInMonth(year: any, month: any) {
    return new Date(year, month + 1, 0).getDate();
  }
  getDayOfWeek(year: any, month: any, day: any) {
    // getDay() devuelve 0 para domingo, 1 para lunes, ..., 6 para sábado
    const dayOfWeek = new Date(year, month, day).getDay();

    // Ajustar para que 0 sea lunes, 1 sea martes, ..., 6 sea domingo
    return (dayOfWeek + 6) % 7;
  }

  /**
   * Asigna los días del mes a los nombres de los días de la semana para un año y mes dados.
   *
   * @param {number} year - El año para el cual se desea asignar los días a los nombres de los días de la semana.
   * @param {number} month - El mes para el cual se desea asignar los días a los nombres de los días de la semana.
   *                         Los meses se indican como números enteros, donde enero es 0, febrero es 1, y así sucesivamente hasta diciembre que es 11.
   * @returns {Array<Object>} Una matriz de objetos donde cada objeto tiene dos propiedades:
   *                          - `day`: El día del mes.
   *                          - `weekday`: El nombre del día de la semana correspondiente (por ejemplo, 'MON' para lunes, 'TUE' para martes, etc.).
   */
  assignDaysToWeekdays(year: any, month: any) {
    const daysInMonth = this.getDaysInMonth(year, month);
    const firstDayOfMonth = this.getDayOfWeek(year, month, 1);

    const assignedDays = [];
    const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = (firstDayOfMonth + i - 1) % 7;
      if (i == 1 && dayOfWeek > 0) {
        const daysInMonth = this.getDaysInMonth(
          month == 0 ? year - 1 : year,
          month - 1
        );
        for (let index = 0; index < dayOfWeek; index++) {
          // const element = array[index];
          assignedDays.push({
            day: daysInMonth - index,
            weekday: dayNames[index],
          });
        }
      }
      assignedDays.push({ day: i, weekday: dayNames[dayOfWeek] });
    }

    return assignedDays;
  }

  calcularDiasDisponibles(fechaInicial: string, fechaFinal: string): number {
    // Obtener la fecha actual
    const fechaActual = moment();

    // Parsear las fechas
    const momentFechaInicial = moment(fechaInicial);
    const momentFechaFinal = moment(fechaFinal);

    // Calcular la diferencia de días entre la fecha actual y la fecha inicial
    const diasDesdeHoyHastaInicial = momentFechaInicial.diff(
      fechaActual,
      'days'
    );

    // Calcular la diferencia total de días entre la fecha inicial y la fecha final
    const diferenciaTotalEnDias = momentFechaFinal.diff(
      momentFechaInicial,
      'days'
    );

    // Calcular los días disponibles sumando la diferencia total a la diferencia desde hoy hasta la fecha inicial
    const diasDisponibles = diasDesdeHoyHastaInicial + diferenciaTotalEnDias;

    return diasDisponibles == 0 ? 1 : diasDisponibles;
  }

  /**
   * Formatea el tamaño de bytes a una cadena legible por humanos con sufijos de unidades (Bytes, KB, MB, GB, etc.).
   * @param bytes El tamaño en bytes a formatear.
   * @param decimals El número de decimales a mostrar (opcional, por defecto es 2).
   * @returns La cadena formateada con el tamaño legible por humanos.
   */
  formatBytes(bytes: number, decimals = 2): string {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  formatearFechaEspecial(fecha: any) {
    // Fecha proporcionada en formato string
    let fechaProporcionada = fecha;
    // Convertir la fecha proporcionada a un objeto Date
    let fechaProporcionadaDt = new Date(fechaProporcionada);

    // Obtener la fecha y hora actual en milisegundos
    let fechaActual = new Date().getTime();

    // Convertir la fecha proporcionada a milisegundos
    let fechaProporcionadaMs = fechaProporcionadaDt.getTime();

    // Calcular la diferencia de tiempo en milisegundos
    let diferencia = fechaActual - fechaProporcionadaMs;

    // Calcular los días, horas, minutos y segundos transcurridos
    let segundosTranscurridos = Math.floor(diferencia / 1000);
    let minutosTranscurridos = Math.floor(segundosTranscurridos / 60);
    let horasTranscurridas = Math.floor(minutosTranscurridos / 60);
    let diasTranscurridos = Math.floor(horasTranscurridas / 24);

    // Formatear el resultado
    let resultado = 'Hace ';

    if (diasTranscurridos > 0) {
      resultado += diasTranscurridos + ' día(s)';
      return resultado;
    }
    if (horasTranscurridas > 0) {
      resultado += (horasTranscurridas % 24) + ' hora(s)';
      return resultado;
    }
    if (minutosTranscurridos > 0) {
      resultado += (minutosTranscurridos % 60) + ' minuto(s)';
      return resultado;
    }
    resultado += (segundosTranscurridos % 60) + ' segundo(s)';
    return resultado;
  }

  calcularTiempoConsumido(
    fechaInicial: any,
    horasPorDia: any,
    festivos: any[] = [],
    fechaTerminado?: any
  ) {
    let fechaActual: any;
    fechaInicial = new Date(fechaInicial + 'T08:00:00');
    // Función para verificar si una fecha es fin de semana (sábado o domingo)
    const esFinDeSemana = (fecha: any) => {
      const dia = fecha.getDay();
      return dia === 0 || dia === 6;
    };

    // Función para verificar si una fecha es un día festivo
    const esFestivo = (fecha: any) => {
      const formatoFecha = fecha.toISOString().slice(0, 10); // Formato YYYY-MM-DD
      return festivos.includes(formatoFecha);
    };

    if (fechaTerminado) {
      // Obtener la fecha y hora en base a la fecha que termino la tarea
      fechaActual = new Date(fechaTerminado);
    } else {
      // Obtener la fecha y hora actual
      fechaActual = new Date();
    }

    // Verificar si la fecha actual es fin de semana o festivo
    if (esFinDeSemana(fechaActual) || esFestivo(fechaActual)) {
      return '0:00:00'; // Retorna cero si es fin de semana o festivo
    }

    // Inicializar contador para horas laborales totales
    let horasLaboralesTotales = 0;

    // Iterar sobre cada día entre la fecha inicial y la fecha final
    const fechaIterada = new Date(fechaActual);
    while (fechaInicial < fechaIterada) {
      // Verificar si la fecha iterada no es fin de semana ni festiva
      if (!esFinDeSemana(fechaInicial) && !esFestivo(fechaInicial)) {
        // Obtener la cantidad de horas laborales para el día iterado
        const diaSemana = fechaInicial.getDay();
        const horasPorDiaIterado = horasPorDia[diaSemana] || 8;

        // Sumar las horas laborales diarias al contador de horas laborales totales
        horasLaboralesTotales += horasPorDiaIterado;
      }

      // Avanzar al siguiente día
      fechaInicial.setDate(fechaInicial.getDate() + 1);
    }
    let horas = 0;
    let minutos = 0;
    let segundos = 0;

    // Formatear el resultado en hh:mm:ss
    horas = Math.floor(horasLaboralesTotales);
    minutos = Math.floor((horasLaboralesTotales - horas) * 60);
    segundos = Math.floor(
      ((horasLaboralesTotales - horas) * 60 - minutos) * 60
    );

    if (!fechaTerminado) {
      horasLaboralesTotales = this.restarHorasLaborales(
        horasLaboralesTotales,
        horasPorDia[fechaActual.getDay()] || 8
      ).cantidad;

      // Formatear el resultado en hh:mm:ss
      horas = Math.floor(horasLaboralesTotales);
      minutos = Math.floor((horasLaboralesTotales - horas) * 60);
      segundos = Math.floor(
        ((horasLaboralesTotales - horas) * 60 - minutos) * 60
      );

      // // Aumentar segundos
      segundos += new Date().getSeconds();

      // // Manejar desbordamiento de segundos
      if (segundos > 59) {
        minutos++; // Restar un minuto
        segundos += 60; // Añadir los segundos al siguiente ciclo de 60 segundos
      }
      // Aumentar minutos
      minutos += new Date().getMinutes();

      // Manejar desbordamiento de minutos
      if (minutos > 59) {
        horas++; // Restar una hora
        minutos += 60; // Añadir los minutos al siguiente ciclo de 60 minutos
      }

      // Manejar desbordamiento de horas
      if (horas < 0) {
        horas += 24; // Volver a 0 después de 24 horas
      }

      if (
        this.restarHorasLaborales(
          horasLaboralesTotales,
          horasPorDia[fechaActual.getDay()] || 8
        ).minutos < 60
      ) {
        minutos = this.restarHorasLaborales(
          horasLaboralesTotales,
          horasPorDia[fechaActual.getDay()] || 8
        ).minutos;
      }

      // Manejar desbordamiento de minutos
      if (minutos > 59) {
        horas++; // Restar una hora
        minutos += 60; // Añadir los minutos al siguiente ciclo de 60 minutos
      }

      // Manejar desbordamiento de horas
      if (horas < 0) {
        horas += 24; // Volver a 0 después de 24 horas
      }
    }

    // Formatear la nueva cadena de tiempo
    const nuevoTiempoFormateado = `${horas
      .toString()
      .padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos
      .toString()
      .padStart(2, '0')}`;

    return nuevoTiempoFormateado;
  }

  minutosAcumulados() {
    const fechaActual = new Date();
    let acuMininutos: number = 0;

    if (fechaActual.getHours() == 12 && fechaActual.getMinutes() < 30) {
      acuMininutos += fechaActual.getMinutes();
    } else {
      acuMininutos += 30;
    }

    if (
      fechaActual.getHours() == 13 &&
      fechaActual.getMinutes() > 30 &&
      fechaActual.getHours() < 14
    ) {
      acuMininutos += fechaActual.getMinutes() - 30;
    } else {
      acuMininutos += 30;
    }
    return acuMininutos;
  }

  restarHorasLaborales(cantidadHoras: number, horasLaborales: number) {
    // Acumulado de minutos
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Obtener el día de la semana (0 para domingo, 1 para lunes, ..., 6 para sábado)
    const diaSemana = fechaActual.getDay();

    // Definir los días laborales y sus respectivos horarios
    const diasLaborales = [1, 2, 3, 4, 5]; // Lunes, martes, miercoles,jueves y viernes
    let i = 8;
    let horas = 0;
    // Verificar si es un día laboral
    if (diasLaborales.includes(diaSemana)) {
      while (i < fechaActual.getHours()) {
        i++;
        if (
          i > 12 &&
          i <= 14
          // ||
          // (fechaActual.getHours() >= 17 && minutos > 30)
        ) {
          continue;
        }
        horas++;
      }
    }
    if (this.minutosAcumulados() == 60) {
      horas++;
    }
    cantidadHoras -= horasLaborales - horas;
    return {
      cantidad: cantidadHoras,
      minutos: this.minutosAcumulados(),
    };
  }

  calcularTiempoConsumidoPorHoras(
    fechaInicial: any,
    fechaFinal: any,
    horasPorDia: Record<number, number>,
    festivos: string[] = []
  ): string {
    fechaInicial = new Date(fechaInicial + 'T08:00:00');
    fechaFinal = new Date(fechaFinal + 'T17:30:00');
    // Función para verificar si una fecha es fin de semana (sábado o domingo)
    const esFinDeSemana = (fecha: Date): boolean => {
      const dia = fecha.getDay();
      return dia === 0 || dia === 6;
    };

    // Función para verificar si una fecha es un día festivo
    const esFestivo = (fecha: Date): boolean => {
      const formatoFecha = fecha.toISOString().slice(0, 10); // Formato YYYY-MM-DD
      return festivos.includes(formatoFecha);
    };

    // Inicializar contador para horas laborales totales
    let horasLaboralesTotales = 0;

    // Iterar sobre cada día entre la fecha inicial y la fecha final
    const fechaIterada = new Date(fechaInicial);
    while (fechaIterada < fechaFinal) {
      // Verificar si la fecha iterada no es fin de semana ni festiva
      if (!esFinDeSemana(fechaIterada) && !esFestivo(fechaIterada)) {
        // Obtener la cantidad de horas laborales para el día iterado
        const diaSemana = fechaIterada.getDay();
        const horasPorDiaIterado = horasPorDia[diaSemana] || 8;

        // Sumar las horas laborales diarias al contador de horas laborales totales
        horasLaboralesTotales += horasPorDiaIterado;
      }

      // Avanzar al siguiente día
      fechaIterada.setDate(fechaIterada.getDate() + 1);
    }

    // Formatear el resultado en hh:mm:ss
    const horas = Math.floor(horasLaboralesTotales);
    const minutos = Math.floor((horasLaboralesTotales - horas) * 60);
    const segundos = Math.floor(
      ((horasLaboralesTotales - horas) * 60 - minutos) * 60
    );
    const tiempoFormateado = `${horas.toString().padStart(2, '0')}:${minutos
      .toString()
      .padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    return tiempoFormateado;
  }

  calcularDiferenciaEnHoras(tiempo1: string, tiempo2: string): string {
    // Función para convertir un tiempo en formato HH:MM:SS a segundos
    function aSegundos(tiempo: string): number {
      const [horas, minutos, segundos] = tiempo.split(':').map(Number);
      return horas * 3600 + minutos * 60 + segundos;
    }

    // Función para convertir segundos a formato HH:MM:SS
    function segundosAFormatoTiempo(segundos: number): string {
      const horas = Math.floor(segundos / 3600);
      const minutos = Math.floor((segundos % 3600) / 60);
      const segundosRestantes = segundos % 60;
      return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(
        2,
        '0'
      )}:${String(segundosRestantes).padStart(2, '0')}`;
    }

    // Convertir ambos tiempos a segundos
    const segundosTiempo1: number = aSegundos(tiempo1);
    const segundosTiempo2: number = aSegundos(tiempo2);

    // Calcular la diferencia en segundos
    const diferenciaSegundos: number = Math.abs(
      segundosTiempo1 - segundosTiempo2
    );

    // Convertir la diferencia de segundos a formato HH:MM:SS
    const diferenciaEnFormato: string =
      segundosAFormatoTiempo(diferenciaSegundos);

    return diferenciaEnFormato;
  }

  calcularEstadoDelTiempo(
    fecha_inicial: string,
    fecha_final: string,
    fecha_terminada: string
  ) {
    if (
      moment(
        fecha_terminada ? fecha_terminada : this.formatDate(new Date())
      ).isBefore(moment(fecha_final))
    ) {
      return '#00c875';
    } else if (
      moment(
        fecha_terminada ? fecha_terminada : this.formatDate(new Date())
      ).isSame(moment(fecha_final))
    ) {
      return '#fdab3d';
    } else {
      return 'red';
    }
  }

  async logout() {
    localStorage.clear();
    await this.router.navigateByUrl('/auth');
  }

  createEventId() {
    return String(eventGuid++);
  }
}
