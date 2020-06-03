import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { share, shareReplay } from 'rxjs/operators';

import { Employee } from 'src/app/typedef';

import { EmployeesService } from 'src/app/api/employees.service';

@Component({
  selector: 'itcorpo-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.css']
})
export class EmployeeListingComponent implements OnInit {
  employees$: Observable<Employee[]>

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
