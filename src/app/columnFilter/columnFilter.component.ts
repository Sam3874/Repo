import { Component, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { messageService } from '../common/services/message.service/message.service';
import { contentProvider } from "./contentProvider";

@Component({
  selector: 'app',
  templateUrl: './columnFilter.template.html'
})
export class columnFilterComponent {
  name: string = 'Data Grid with Column Filter';
  columnKeys: string[];
  //columns: any[];
  columnMap: any[];
  columnLabels: any;
  tempItem: contentProvider;
  db: localDatabase;
  config: any;

  constructor(private messageService: messageService) {    //private route: ActivatedRoute  
    //this.columns = ["RowNum", "Quantity", "Required", "Justification", "Comments", "Date", "DialogInput"];
    this.config = {
      showGlobalFilter: true,
      showColumnFilter: true
    };
    this.columnKeys = ["col1", "col2", "col3", "col4", "col5", "col6", "col7"];
    this.columnMap = [
      { columnKey: "col1", labelKey: "label1",  dataKey: "RowNum", isDate: false},
      { columnKey: "col2", labelKey: "label2",  dataKey: "Quantity", isDate: false},
      { columnKey: "col3", labelKey: "label3",  dataKey: "Required", isDate: false},
      { columnKey: "col4", labelKey: "label4",  dataKey: "Justification", isDate: false},
      { columnKey: "col5", labelKey: "label5",  dataKey: "Comments", isDate: false},
      { columnKey: "col6", labelKey: "label6",  dataKey: "Date", isDate: true},
      { columnKey: "col7", labelKey: "label7",  dataKey: "DialogInput", isDate: false}
    ];

  // this will be input from component
    this.columnLabels = { 
      label1: "Row Num",
      label2: "Quantity",
      label3: "Required",
      label4: "Justification",
      label5: "Comments",
      label6: "Date",
      label7: "Dialog Input" 
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
    for (let i = 1; i <= 200; i++) {
      this.item = new contentProvider(i, "Quantity " + i, this.flag, "Test Justification " + i, "Test Comments" + i, new Date().setDate(this.day), !this.flag);
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