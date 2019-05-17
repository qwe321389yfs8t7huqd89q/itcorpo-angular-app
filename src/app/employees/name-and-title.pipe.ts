import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from 'src/app/typedef';

@Pipe({
  name: 'nameAndTitle'
})
export class NameAndTitlePipe implements PipeTransform {

  transform(e: Employee, args?: any): string {
    return `${ e.firstName } ${ e.lastName }, ${ e.title }`
  }

}
