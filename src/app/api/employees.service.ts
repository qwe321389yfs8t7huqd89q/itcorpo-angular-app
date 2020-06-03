import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiURL, MAX_PAGE_SIZE } from './config';
import { applyQueryString } from './queryString';

import { Employee, Nationality } from 'src/app/typedef';
import { Observable, range, merge, of } from 'rxjs';
import { map, flatMap, concatMap, scan, mergeMap } from 'rxjs/operators';

export type EmployeeCriteria = {
  nationality?: Nationality
  office_like?: string // for either cities or countries
}

type Chunk = {
  data: Employee[]
  pageIdx: number
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

  private getFirstPage(criteria: EmployeeCriteria = {}, pageSize = 50){
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

  private getAllPagesChunks(criteria: EmployeeCriteria = {}) {
    
  }

  // type Chunk = { data: Employee[], pageIdx: number }
  getAllEmployees(criteria: EmployeeCriteria = {}): Observable<Employee[]> {
    return this.getFirstPage(criteria).pipe(
      flatMap(({ totalCount, data: firstPageData }) => {
        const pageCount = Math.ceil(totalCount / MAX_PAGE_SIZE)
        const pages$ = range(2, pageCount - 1)
        return merge(
          of({ data: firstPageData, pageIdx: 1 }),
          pages$.pipe(
            mergeMap(pageIdx => this.getPage(criteria, pageIdx).pipe(
              map(data => ({ data, pageIdx })),
            )),
          )
        )
      }),
      scan( (allChunks, chunk: Chunk) => allChunks.concat(chunk), [] as Chunk[] ),
      // scan( (allEmployees, employeePage) => allEmployees.concat(employeePage), [] as Employee[] ),
      // scan( (allEmployees, employeePage) => [...allEmployees, ...employeePage], [] as Employee[] ),
    ).pipe(
      map(chunks => chunks
        .sort((c1, c2) => c1.pageIdx - c2.pageIdx)
        //   [ {idx:5, data:[A, B, C]}, {idx:13, data:[D, E, F]} ]
        // .map(chunk => chunk.data)
        // //   [ [A, B, C], [D, E, F] ]
        // .flat()
        .flatMap(chunk => chunk.data)
      )
    )
  }
}
