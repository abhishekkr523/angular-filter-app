import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import data from "src/assets/data.json";
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  //  used fontawesome icon for edit and delete
  Icon = faTrash;
  faedit = faEdit;

  dataSource: any[] = []
  // dataLet=any[]
  
  displayedColumns: string[] = ['id', 'task', 'date', 'status', 'description', 'actions'];
  dataLet: any[] = [];

  // totalData!: number;
  // completedData!: any[];
  // completedValue!: number;
  // pendingData!: any[];
  // pendingValue!: number;
  // notStartedData!: any[];
  // notStartedValue!: number;
  constructor(private _dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.loadDataFromLocalStorage()
    // console.log(this.dataSource)
  }

  loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      this.dataSource = JSON.parse(storedData);
    }
  }
  openDialog() {
    const dialogRef = this._dialog.open(DialogComponent, {
      
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result,'hii abhi')
      this.dataSource = [...this.dataSource, result]
      // console.log(this.dataSource)
      localStorage.setItem('formData', JSON.stringify([...this.dataSource]));
      // this.filterValues(this.dataSource);
      this.dataLet = [...this.dataSource];
      // console.log(result,'hii abhi')
    });
    
  }
  // Function to filter the data from the table 
  // filterData(key: string) {
  //   this.loadDataFromLocalStorage();
  //   const filterValue = this.dataSource.filter((value) => {
  //     return value.status == key;
  //   });
  //   this.dataSource = [...filterValue];
  //   if (key == 'total') {
  //     this.dataSource = this.dataLet;
  //   }
  // }

  // Function to print the number of every filter value
  // filterValues(data: any[]) {
  //   this.totalData = data.length;
  //   this.completedData = data.filter((data) => {
  //     return data.status == "Completed";
  //   });
  //   this.completedValue = this.completedData.length;
  //   this.pendingData = data.filter((data) => {
  //     return data.status == "Pending";
  //   });
  //   this.pendingValue = this.pendingData.length;
  //   this.notStartedData = data.filter((data) => {
  //     return data.status == "Not Started";
  //   });
  //   this.notStartedValue = this.notStartedData.length;
  // }

  // Function to save data in the localStorage of the dataSource
  saveToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(this.dataSource));
  }
  // Function to delete the row from the table 
  deleteItem(id: number) {
    this.dataSource = this.dataSource.filter((item) => item.id !== id);
    this.saveToLocalStorage();
  }

  
  // function to update the table's vlaues
  updateItem(id: number) {
   
    for (let i = 0; i < this.dataSource.length; i++) {
      if ((this.dataSource[i].id)) {
        
        const dialogData = this._dialog.open(DialogComponent, {
          data: {
            
            updateItem: this.dataSource,
            indexOfData: i
          }
          
        });
    
        
      }
    }
    // console.log(,'hii abhi')
  }
}



