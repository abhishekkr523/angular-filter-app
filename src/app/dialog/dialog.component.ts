import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  
  statuses:string[]=[
    'Pending',
    'Completed',
    'Inprogress'
  ];
    
  formData: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
     private _fb: FormBuilder, private _dialog: MatDialog,
      public dialogRef: MatDialogRef<TableComponent>) {
        console.log(data,'for editable');
        
    this.formData = this._fb.group({
      id: data?.tableData.id||'',
      task:data?.tableData.task|| '',
      date:data?.tableData.date|| '',
      status:data?.tableData.status|| '',
      description:data?.tableData.description|| ''
    })
  }

  onFormSubmit() {
    console.log(this.formData.value);
    if (this.formData.valid) {
      this.dialogRef.close(
        this.formData.value
      )
    }

  }

}

