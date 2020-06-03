import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Nationality } from 'src/app/typedef';

type ChosenCountry = string
// type ChosenCountry = Nationality | null

@Injectable({
  providedIn: 'root'
})
export class ChosenCountryService {

  private countrySubject = new Subject<ChosenCountry>();

  publish(country: ChosenCountry){
    this.countrySubject.next(country)
  }

  readonly country$ = this.countrySubject.asObservable()
  // subscribe(subFn: Function){
  //   return this.countrySubject.subscribe(subFn)
  // }
}
