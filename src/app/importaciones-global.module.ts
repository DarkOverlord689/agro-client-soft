// MODULO
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NG-ZORRO
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

// Material
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';

const MODULOS = [
  NzInputModule,
  NzFormModule,
  NzDropDownModule,
  NzSelectModule,
  NzBreadCrumbModule,
  NzModalModule,
  NzTabsModule,
  NzTableModule,
  NzSelectModule,
  NzFormModule,
  NzSwitchModule,
  NzToolTipModule,
  NzDatePickerModule,
  NzButtonModule,
  NzSpinModule,
  NzCarouselModule,
  NzIconModule,
  NzDividerModule,
  NzCheckboxModule,
  NzCardModule,
  NzSliderModule,
  NzListModule,
  NzSkeletonModule,
  NzTimePickerModule,
  NzInputNumberModule,
  NzPopoverModule,
  NzUploadModule,
  NzPopconfirmModule,
  NzMessageModule,
  NzQRCodeModule,
  // MATERIAL
  MatPaginatorModule,
  MatTableModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MODULOS],
  exports: [...MODULOS],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntl,
    },
  ],
})
export class ImportacionesGlobalModule {}
