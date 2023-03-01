import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from './services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DataComponent } from './data/data.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'online_test';
  displayedColumns: string[] = ['ID', 'Name', 'State', 'Zip', 'Amount', 'Quantity', 'Item','Action'];
  dataSource: any;
  users:any;
  result:any;
  length = 0;
  id:any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dialogRef: any;

  constructor(private _dataService:DataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    
    this._dataService.getList().subscribe( res => {
      this.result = res;
      console.log(this.result);
      
      this.dataSource = new MatTableDataSource(this.result);
      this.length = this.result.length;
      console.log(this.length);
      this.dataSource.paginator = this.paginator;
      setTimeout(() => {
        this.paginator.length = this.length;
      });  
    });
  }

  addRow(){
    const dialogRef = this.dialog.open(DataComponent, {
      width: '550px',
      height: 'auto',
      data:{ id:'',name:'',state:'',zip:'',amount:'',qty:'',item:''},
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getData();
    });
  }

  editRow(row:any){
    console.log(row);
    const dialogRef = this.dialog.open(DataComponent, {
      width: '550px',
      height: 'auto',
      data:row,
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getData();
    });
  }

  deleteRow(row:any) {
    const formData = new FormData();
    formData.append('id',row.id);
    this._dataService.deleteData(formData).subscribe(res => {
      this.getData();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
