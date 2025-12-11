import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Employee } from '../interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
readonly url="https://localhost:7128/api/"
 subject$=new BehaviorSubject<any>({name:'naresh',age:23});
 usersubject=this.subject$.asObservable()
Get_EmployeeData():Observable<Employee[]>
{
 
  return this.http.get<Employee[]>(`${this.url}Common/Get_EmpolyeeData`);

}

Post_EmployeeData(obj:any):Observable<any>
{
  return this.http.post<any>(`${this.url}Common/Post_EmpolyeeData`,obj);

}


}
