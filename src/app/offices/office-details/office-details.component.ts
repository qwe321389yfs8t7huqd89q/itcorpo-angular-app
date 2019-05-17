import { Component, Input } from '@angular/core';

import { Office } from 'src/app/typedef';

@Component({
  selector: 'itcorpo-office-details',
  templateUrl: './office-details.component.html'
})
export class OfficeDetailsComponent {
  @Input()
  office: Office
}
