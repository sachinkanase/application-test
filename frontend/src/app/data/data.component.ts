import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  rowData:any;
  editdata:any;
  result:any=false;
  Id:any;
  btnName:string= "Save";
  
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private _dataService:DataService){

  }

  ngOnInit() {
    this.rowData = this.data;
    this.Id = this.data.id;
    if(this.data.id != ""){
      this.btnName = "Update";
    }
    this.loadForm();
  }
  get f() { return this.editdata.controls; }
  loadForm(){
    this.editdata = this.fb.group({
      name : new FormControl(this.rowData.name, [Validators.required]),
      state : new FormControl(this.rowData.state, [Validators.required] ),
      zip : new FormControl(this.rowData.zip, [Validators.required]),
      amount : new FormControl(this.rowData.amount, [Validators.required]),
      qty : new FormControl(this.rowData.qty, [Validators.required]),
      item : new FormControl(this.rowData.item, [Validators.required]),
    })
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('id',this.Id);
    formData.append('name',this.editdata.value.name);
    formData.append('state',this.editdata.value.state);
    formData.append('zip',this.editdata.value.zip);
    formData.append('amount',this.editdata.value.amount);
    formData.append('qty',this.editdata.value.qty);
    formData.append('item',this.editdata.value.item);
    if(this.Id != ""){
      this._dataService.updateData(formData).subscribe(res => {
          this.dialog.closeAll();
      });
    } else {
      this._dataService.saveData(formData).subscribe(res => {
        this.dialog.closeAll();
      });
    }
  }
}
