import { Component, Input } from '@angular/core';
import { Benefit } from 'src/app/typedef';

@Component({
  selector: 'itcorpo-benefit-details',
  templateUrl: './benefit-details.component.html',
  styleUrls: ['./benefit-details.component.css']
})
export class BenefitDetailsComponent {
  @Input()
  benefit: Benefit
}
