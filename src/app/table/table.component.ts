import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import data from "src/assets/data.json";
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {

  //  used fontawesome icon for edit and delete
  Icon = faTrash;
  faedit = faEdit;

  dataSource: any[] = [];

  displayedColumns: string[] = [
    'id',
    'task',
    'assignto',
    'status',
    'date',
    'actions',
  ];

  dataLet: any[] = [];

  totalData!: number;
  completedData!: any[];
  completedValue!: number;
  pendingData!: any[];
  pendingValue!: number;
  inprogressData!: any[];
  inprogressValue!: number;

  constructor(private _dialog: MatDialog) { }
  ngOnInit(): void {
    this.loadDataFromLocalStorage();
    this.calculateTaskCounts();
  }

  loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      this.dataSource = JSON.parse(storedData);
    }
  }
  openDialog(element = null, index = null) {
    const dialogRef = this._dialog.open(DialogComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result, 'hii abhi');
      if (result) {
        if (index) {
          this.dataSource[index] = result
        } else {
          this.dataSource = [...this.dataSource, result];
        }
        console.log(this.dataSource)
        localStorage.setItem('formData', JSON.stringify([...this.dataSource]));
        // this.filterValues(this.dataSource);
        this.dataLet = [...this.dataSource];
        // console.log(result,'hii abhi')

        const storedData = localStorage.getItem('formData');
        if (storedData) {
          this.dataSource = JSON.parse(storedData);
        }
      }
    });
  }
  // Function to filter the data from the table
  filterData(key: string) {
    if (key === 'total') {
      this.dataSource = this.dataLet; // Show all tasks for "Total Tasks" filter
    } else {
      this.loadDataFromLocalStorage();

      const filterValue = this.dataSource.filter((value) => {
        return value.status == key;
      });
      this.dataSource = [...filterValue];
    }

    this.calculateTaskCounts(); // Call the method to recalculate task counts
  }

  // Function to print the number of every filter value
  filterValues(data: any[]) {
    this.totalData = data.length;
    this.completedData = data.filter((data) => {
      // console.log(this.completedData)
      return data.status == "Completed";

    });
    // console.log(this.completedData)
    this.completedValue = this.completedData.length;
    this.pendingData = data.filter((data) => {
      return data.status == "Pending";
    });
    this.pendingValue = this.pendingData.length;
    this.inprogressData = data.filter((data) => {
      return data.status == "Not Started";
    });
    this.inprogressValue = this.inprogressData.length;
  }


  private calculateTaskCounts() {
    this.totalData = this.dataSource.length;
    this.completedData = this.dataSource.filter((data) => data.status === 'Completed');
    this.completedValue = this.completedData.length;
    this.pendingData = this.dataSource.filter((data) => data.status === 'Pending');
    this.pendingValue = this.pendingData.length;
    this.inprogressData = this.dataSource.filter((data) => data.status === 'Inprogress');
    this.inprogressValue = this.inprogressData.length;
  }

  // Function to save data in the localStorage of the dataSource
  saveToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(this.dataSource));
  }
  // Function to delete the row from the table
  deleteItem(id: number) {
    this.dataSource = this.dataSource.filter((item) => item.id !== id);
    this.saveToLocalStorage();
  }



  getStatusClass(status: string) {
    switch (status) {
      case 'Completed':
        return 'completed-status'; // CSS class name for completed status
      case 'Inprogress':
        return 'inprogress-status'; // CSS class name for in-progress status
      case 'Pending':
        return 'pending-status'; // CSS class name for pending status
      default:
        return '';
    }
  }
}
