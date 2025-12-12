import { Component } from '@angular/core';
import { Employee } from '../interface/employee';
import { EmployeeService } from '../services/employee.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  constructor(private employee:EmployeeService){

  }
  result:Employee[] | undefined 
  
GetEmployeeData(){

  this.employee.Get_EmployeeData().subscribe(obj=>{
     this.result=obj
    console.log(this.result)
  },catchError(err=>err)

  )
}

ngOnit(){
  debugger
this.GetEmployeeData()
}
}
