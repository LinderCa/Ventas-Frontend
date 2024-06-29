import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  //Definimos una directiva que indique la entrada del padre al hijo
  @Input() actual?: string;
  @Input() actuales?: string;
}
