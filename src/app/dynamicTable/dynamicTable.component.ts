import { Component, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { messageService } from '../common/services/message.service/message.service';
import { contentProvider, dialogOptionsProvider } from "./contentProvider";
import { dialogComponent } from "./dialog.component/dialog.component"

@Component({
  selector: 'app',
  templateUrl: './dynamicTable.template.html'
})
export class dynamicTableComponent {
  name: string = 'Dynamic Table';
  minRowCount: number = 1;
  maxRowCount: number = 10;
  columns: string[];
  data: any;
  tempItem: contentProvider;
  db: localDatabase;

  dialogOptions: dialogOptionsProvider;
  dialogRef: MdDialogRef<dialogComponent>;

  constructor(private messageService: messageService, public dialog: MdDialog) {    //private route: ActivatedRoute  
    this.columns = ["RowNum", "Quantity", "Required", "Justification", "Comments", "Date", "DialogInput"];
    this.db = new localDatabase();
    this.data = this.db.data;
  }

  ngOnInit() {
    //url parameters
    //console.log(this.route.paramMap);
    //console.log(this.route.snapshot.paramMap.get('id'));    
  }

  updateTable(action) {
    switch (action) {
      case "add":
        if (this.db.templateData.length < this.maxRowCount) {
          this.tempItem = { ...this.db.item };
          this.tempItem.RowNum = this.db.templateData.length + 1;
          this.db.templateData.push(this.tempItem);
        } else {          
          this.messageService.showMessage("You have reached to maximum rows", "Got it!");
        }
        break;

      case "remove":
        if (this.db.templateData.length > this.minRowCount) {
          this.db.templateData.pop();
        } else {          
          this.messageService.showMessage("You have reached to minimum rows", "Got it!");
        }
        break;

      case "addHere":
        break;

      case "removeHere":
        break;

      case "reset":
        this.db = new localDatabase();
        break;

      case "default":
    }
    this.db.connectLocalSource();
    this.data = this.db.data;
  }

  showDialog(rowItem): void {
    this.dialogRef = this.dialog.open(dialogComponent, {
      width: '300px',
      data: { name: rowItem.RowNum, dialogOptions: { ...rowItem.DialogOptions } }  //copied into new obj
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        rowItem.DialogOptions = { ...result };  //update model with dialog input
      }
    });
  }
}

export class localDatabase {
  item: contentProvider;
  templateData: contentProvider[];
  data: any;
  constructor() {
    this.item = new contentProvider(1, "", false, "", "", undefined, true, new dialogOptionsProvider(false, "", false));
    this.templateData = [
      { ...this.item },
      new contentProvider(2, "", false, "", "", undefined, true, new dialogOptionsProvider(false, "", false))
    ];
    this.connectLocalSource();
  }
  connectLocalSource() {
    this.data = new localDataSource(this.templateData);
  }
}

export class localDataSource extends DataSource<any> {
  constructor(private data: contentProvider[]) {
    super();
  }
  connect(): Observable<contentProvider[]> {
    return Observable.of(this.data);
  }
  disconnect() { }
}