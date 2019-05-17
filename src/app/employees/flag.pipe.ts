import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from 'src/app/typedef';
import { flag } from '../shared/contexts/nationality';

@Pipe({
  name: 'flag'
})
export class FlagPipe implements PipeTransform {

  transform(e: Employee, args?: any): string {
    return flag(e.nationality)
  }

}
