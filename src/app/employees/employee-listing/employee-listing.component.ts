import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { share, shareReplay, tap, finalize } from 'rxjs/operators';

import { Employee } from 'src/app/typedef';

import { EmployeesService } from 'src/app/api/employees.service';

@Component({
  selector: 'itcorpo-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.css']
})
export class EmployeeListingComponent implements OnInit {
  employees$: Observable<Employee[]>

  loading: boolean = true

  sidebarCollapsed: boolean = true

  cities = {
    "Wilno": "Wilno",
    "Lwów": "Lwów",
  }

  constructor(
    private employeeSvc: EmployeesService,
  ) { }

  ngOnInit() {
    this.employees$ = this.employeeSvc.getAllEmployees().pipe(
      // tap(undefined, undefined, () => { this.loading = false }),
      // tap({
      //   complete: () => { this.loading = false },
      //   error: () => { this.loading = false },
      // }),
      finalize(() => { this.loading = false }),

      // shareReplay()
      // share()
    )

    // this.employees$ = this.employeeSvc.getAllEmployees({ nationality: "PL" })
    // this.employees$ = this.employeeSvc.getAllEmployees({ office_like: "Poland" })
    // this.employees$ = this.employeeSvc.getAllEmployees({ office_like: "Łódź" })
  }

  onToggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed
  }
}
