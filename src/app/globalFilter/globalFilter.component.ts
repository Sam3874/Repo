import { Component, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { messageService } from '../common/services/message.service/message.service';
import { contentProvider } from "./contentProvider";

@Component({
  selector: 'app',
  templateUrl: './globalFilter.template.html'
})
export class globalFilterComponent {
  name: string = 'Data Grid with Simple (Global) Filter';
  columnKeys: string[];
  //columns: any[];
  columnMap: any[];
  columnLabels: any;
  tempItem: contentProvider;
  db: localDatabase;
  config: any;

  constructor(private messageService: messageService) {    //private route: ActivatedRoute  
    this.config = {
      showGlobalFilter: true,
      showColumnFilter: false
    };
    //this.columns = ["RowNum", "Quantity", "Required", "Justification", "Comments", "Date", "DialogInput"];
    this.columnKeys = ["col1", "col2", "col3", "col4", "col5"];
    this.columnMap = [
      { columnKey: "col1", labelKey: "label1",  dataKey: "RowNum", isDate: false, isSort: false },
      { columnKey: "col2", labelKey: "label2",  dataKey: "Quantity", isDate: false, isSort: true },
      { columnKey: "col3", labelKey: "label3",  dataKey: "Required", isDate: false, isSort: true },
      { columnKey: "col4", labelKey: "label4",  dataKey: "Comments", isDate: false, isSort: false },
      { columnKey: "col5", labelKey: "label5",  dataKey: "Date", isDate: true, isSort: true }
    ];

  // this will be input from component
    this.columnLabels = { 
      label1: "Row #",
      label2: "Quantity",
      label3: "Required",
      label4: "Comments",
      label5: "Date"
    };
    
    //this will be input from component
    this.db = new localDatabase();
  }

  ngOnInit() { }
 }

export class dialogFilterProvider {
  constructor(public label: string, public property: string, public value: string) { }
}

export class localDatabase {
  item: contentProvider;
  templateData: contentProvider[] = [];
  flag: boolean = true;
  day: number = 1;
  constructor() {
    for (let i = 1; i <= 100; i++) {
      this.item = new contentProvider(i, "quantity " + i, this.flag, "Test comments" + i, new Date().setDate(this.day));
      this.templateData.push(this.item);
      this.dataChange.next(this.templateData);
      this.flag = !this.flag;
      this.day >= 30 ? this.day = 1 : this.day++;
    }
  }

  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<contentProvider[]> = new BehaviorSubject<contentProvider[]>([]);
  get data(): contentProvider[] { return this.dataChange.value; }
}