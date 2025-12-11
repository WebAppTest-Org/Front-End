import { Component,OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { catchError, map, Observable, startWith } from 'rxjs';
import { EmployeeService } from './services/employee.service';
import { Employee } from './interface/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

myForm!: FormGroup;
submitted = false;
selected = false;

@ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
private dialogRef!: MatDialogRef<any>;
  filteredUniversities!: Observable<string[]>;

  universities: string[] = [
    'Harvard University',
    'Stanford University',
    'Massachusetts Institute of Technology (MIT)',
    'University of Oxford',
    'University of Cambridge',
    'California Institute of Technology (Caltech)',
    'Princeton University',
    'Yale University',
    'Columbia University',
    'University of Chicago'
  ];
  constructor(private fb: FormBuilder,private dialog: MatDialog,private employee:EmployeeService) {}
skillsList: string[] = [
  'JavaScript',
  'TypeScript',
  'Angular',
  'React',
  'Node.js',
  'Python'
];
getsubject$:Observable<any> | undefined
  ngOnInit() {
 
    
      this.getsubject$ =this.employee.usersubject
    
    this.GetEmployeeData()
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      country: ['', Validators.required],
      gender: ['', Validators.required],
      agree: [false, Validators.requiredTrue],
         university: ['', Validators.required],
         skills: [[], Validators.required] ,
        email: ['', [Validators.required, Validators.email]] ,
        file: [[], Validators.required]
    });
   this.filteredUniversities = this.myForm.get('university')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }
 private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.universities.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
openConfirmDialog() {
    this.dialogRef = this.dialog.open(this.confirmDialog, {
      width: '500px',
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
         this.submitted = true; 
         this.selected=true
   if(this.myForm.valid){
    console.log(this.myForm.value)

    const formData = new FormData();

    formData.append("Name", this.myForm.value.name);
    formData.append("Email", this.myForm.value.email);
    formData.append("Country", this.myForm.value.country);
    formData.append("Gender", this.myForm.value.gender);
    formData.append("University", this.myForm.value.university);

  this.myForm.value.skills.forEach((skill: string) => {
      formData.append("Skills", skill);
  });
    formData.append("File", this.myForm.value.file[0]); 
    formData.append("Agree", this.myForm.value.agree.toString());


  this.employee.Post_EmployeeData(formData).subscribe(result=>{
    this.myForm.reset()
  },catchError(err=>err))
   }
    }
  else {
        console.log("Submission cancelled.");
      }
    });
  }
selectedFiles: File[] = [];
// app.component.ts
get fileNames(): string {
  return this.selectedFiles.map(f => f.name).join(', ');
}

  // Handle file selection
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Append new files to selectedFiles array
      this.selectedFiles.push(...Array.from(input.files));

      // Update form control
      this.myForm.get('file')?.setValue(this.selectedFiles);
      this.myForm.get('file')?.updateValueAndValidity();
    }
  }

  // Remove a file
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.myForm.get('file')?.setValue(this.selectedFiles);
    this.myForm.get('file')?.updateValueAndValidity();
  }
  closeDialog(answer: boolean) {
    this.dialogRef.close(answer);
  }
  result:Employee[] | undefined 
GetEmployeeData(){
  this.employee.Get_EmployeeData().subscribe(obj=>{
     this.result=obj
    console.log(this.result)
  },catchError(err=>err)

  )
}

}
