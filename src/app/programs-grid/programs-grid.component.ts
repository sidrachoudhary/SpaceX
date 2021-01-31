import { Component, Input} from '@angular/core';
@Component({
  selector: 'app-programs-grid',
  templateUrl: './programs-grid.component.html',
  styleUrls: ['./programs-grid.component.css']
})
export class ProgramsGridComponent {

@Input() launchData :any;
@Input() launchCount =0;
  constructor() { }

}
