import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ITag } from '../../models/tag.interface';

@Component({
  selector: 'app-sub-navbar',
  templateUrl: './sub-navbar.component.html',
  styleUrls: ['./sub-navbar.component.scss'],
})
export class SubNavbarComponent  {
  tagActivo: number = 1;
  @Input() tag: ITag[] = [];
  @Output() emitTag: EventEmitter<string> = new EventEmitter();

  selectActive: boolean = false;


  // EVENTS
  tagSeleccionadoMet(item: ITag) {
    this.tagActivo = item.id;

    this.emitTag.emit(item.codigo);
  }
}
