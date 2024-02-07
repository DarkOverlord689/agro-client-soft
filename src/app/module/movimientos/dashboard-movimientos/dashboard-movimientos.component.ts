import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard-movimientos',
  templateUrl: './dashboard-movimientos.component.html',
  styleUrls: ['./dashboard-movimientos.component.scss']
})
export class DashboardMovimientosComponent {
  // Elemento del DOM
  @ViewChild('chartPie', { static: true }) chartPie!: ElementRef;
  @ViewChild('chartBar1', { static: true }) chartBar1!: ElementRef;
  @ViewChild('chartBar2', { static: true }) chartBar2!: ElementRef;
  @ViewChild('chartBar3', { static: true }) chartBar3!: ElementRef;
  @ViewChild('chartPunto', { static: true }) chartPunto!: ElementRef;

  // Grafica
  chartPieGraf: null | echarts.EChartsType = null;
  chartBarGraf1: null | echarts.EChartsType = null;
  chartBarGraf2: null | echarts.EChartsType = null;
  chartBarGraf3: null | echarts.EChartsType = null;
  chartPuntoGraf: null | echarts.EChartsType = null;

  ngOnInit(): void {
    this.initDashboard();
  }

  initDashboard() {
    this.chartPieGraf = echarts.init(this.chartPie.nativeElement);
    this.chartBarGraf1 = echarts.init(this.chartBar1.nativeElement);
    this.chartBarGraf2 = echarts.init(this.chartBar2.nativeElement);
    this.chartBarGraf3 = echarts.init(this.chartBar3.nativeElement);

    this.chartPuntoGraf = echarts.init(this.chartPunto.nativeElement);

    const optionPunto = {
      title: {
        text: 'Cantidad de ventas por mes',
        subtext: 'Visualización de ventas en el año',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
          symbolSize: 10, // Tamaño de los puntos
          itemStyle: {
            color: '#448a26' // Cambia el color de los puntos
          }
        },
      ],
    };

    const optionBar = {
      title: {
        text: 'Calificación de empleados',
        subtext: 'Visualización de tareas por empleado',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          itemStyle: {
            color: '#448a26',
          },
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
          label: {
            show: true,
            position: 'inside',
          },
          emphasis: {
            focus: 'series',
          },
          // Modo de selección
          selectedMode: 'single',
          // Colores cuando se selecciona y cuando no se selecciona
          selectedOffset: 5,
          selected: {
            itemStyle: {
              color: 'red', // Color de la barra seleccionada
            },
          },
        },
      ],
    };

    // GRAFICA DE PIE
    const optionChartPie = {
      title: {
        text: 'Distribución de calificación del producto',
        subtext: 'Visualización de las distribución de los estados',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: 'bottom',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
        },
      ],
    };

    this.chartPieGraf.setOption(optionChartPie);
    this.chartBarGraf1.setOption(optionBar);
    this.chartBarGraf2.setOption(optionBar);
    this.chartBarGraf3.setOption(optionBar);
    this.chartPuntoGraf.setOption(optionPunto);
  }
}
