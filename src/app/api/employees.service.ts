import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiURL, MAX_PAGE_SIZE } from './config';
import { applyQueryString } from './queryString';

import { Employee, Nationality } from 'src/app/typedef';
import { Observable, range } from 'rxjs';
import { map, flatMap, concatMap, scan, mergeMap } from 'rxjs/operators';

export type EmployeeCriteria = {
  nationality?: Nationality
  office_like?: string // for either cities or countries
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient
  ) { }

  deleteEmployee(id: Employee['id']) {
    return this.http.delete(`${apiURL}/employees/${id}`)
  }

  getEmployee(id: Employee['id']) {
    return this.http.get<Employee>(`${apiURL}/employees/${id}`)
  }

  getPage(criteria: EmployeeCriteria = {}, page: number = 1, pageSize = 50) {
    const query = applyQueryString({ ...criteria, 
      _limit: pageSize,
      _page: page
    })
    return this.http.get<Employee[]>(`${apiURL}/employees${query}`)
  }

  getFirstPage(criteria: EmployeeCriteria = {}, pageSize = 50){
    const query = applyQueryString({ ...criteria, 
      _limit: pageSize,
      _page: 1
    })
    return this.http.get<Employee[]>(`${apiURL}/employees${query}`, {
      observe: 'response'
    }).pipe(
      map(resp => ({
        totalCount: parseInt(resp.headers.get('X-Total-Count')),
        data : resp.body,
      }))
    )
  }

  private getCount(criteria: EmployeeCriteria = {}) {
    const query = applyQueryString(criteria as any)
    return this.http.get<number>(`${apiURL}/employees/count${query}`)
  }

  getAllEmployees(criteria: EmployeeCriteria = {}): Observable<Employee[]> {
    return this.getCount(criteria).pipe(
      map(itemsCount => Math.ceil(itemsCount / MAX_PAGE_SIZE)),
      flatMap(pageCount => range(1, pageCount)),
      mergeMap(pageIdx => this.getPage(criteria, pageIdx)),
      scan( (allEmployees, employeePage) => allEmployees.concat(employeePage), [] as Employee[] ),
      // scan( (allEmployees, employeePage) => [...allEmployees, ...employeePage], [] ),
    )
    // return this.getPage(criteria)
  }
}
