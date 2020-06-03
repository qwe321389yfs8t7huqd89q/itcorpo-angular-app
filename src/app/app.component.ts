import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { GeoService } from './api/geo.service';
import { Nationality } from 'src/app/typedef';

@Component({
  selector: 'itcorpo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  geoData$: Observable<{ [k: string]: string }>

  constructor(
    private geoSvc: GeoService,
  ){}

  ngOnInit(): void {
    this.geoData$ = this.geoSvc.getGeo()
  }

  updateCountry(countryCode: string){
    console.log(countryCode)
  }
}
