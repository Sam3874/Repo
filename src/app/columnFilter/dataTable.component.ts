import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { messageService } from '../common/services/message.service/message.service';
import { contentProvider } from "./contentProvider";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { dialogFilterComponent } from "./dialog.component/dialog.component"

@Component({
  selector: 'app',
  templateUrl: './dataTable.template.html'
})
export class dataTableComponent {
  name: string = 'Data Table with Column Filter';
  columnKeys: string[];
  //columns: any[];
  columnMap: any[];
  columnLabels: any;
  tempItem: contentProvider;
  db: localDatabase;
  data: localDataSource | null;
  dialogRef: MatDialogRef<dialogFilterComponent>;
  dialogFilters: dialogFilterProvider[] = [];
  dialogFilter: dialogFilterProvider;
  selectedChipProperty: string = "";

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(private messageService: messageService, public dialog: MatDialog) {    //private route: ActivatedRoute  
    //this.columns = ["RowNum", "Quantity", "Required", "Justification", "Comments", "Date", "DialogInput"];
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

  ngOnInit() {
    this.data = new localDataSource(this.db, this.sort, this.paginator, this);

    //initial sort options
    this.sort.active = "RowNum";
    this.sort.direction = "asc";

    //Filter configuration
    if (this.filter && this.filter.nativeElement) {
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(250)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.data) { return; }
          this.data.filter = [new dialogFilterProvider('', 'ALL', this.filter.nativeElement.value)];
        });
    }
  }

  getColumnValue(key) {
    let flagContinue: boolean = true;
    let value:string;
    for (let item of this.columnMap) {
      if (flagContinue) { 
        if (item.columnKey === key) {
          value = this.columnLabels[item.labelKey];
          flagContinue = false;
        }
      }
    }
    return (value || key);
  }

  getDataValue(data, key) {
    let flagContinue: boolean = true;
    let value:any;
    for (let item of this.columnMap) {
      if (flagContinue) { 
        if (item.columnKey === key) {
          value = item.isDate? new Date(data[item.dataKey]).toDateString().substring(4): String(data[item.dataKey]);
          flagContinue = false;
        }
      }
    }
    //value = this.isDate(String(value)) ? new Date(value): String(value);
    return ((value) || key);
  }

  getMapKey(key) {
    let flagContinue: boolean = true;
    let value:string;
    for (let item of this.columnMap) {
      if (flagContinue) { 
        if (item.columnKey === key) {
          value = item.dataKey;
          flagContinue = false;
        }
      }
    }
    return (value || key);
  }

  /* isDate(date) {  
    let parsedDate = Date.parse(date);    
    //console.log(date);
    console.log(date, !isNaN(parsedDate));
    // You want to check again for !isNaN(parsedDate) here because Dates can be converted
    // to numbers, but a failed Date parse will not.
    return (isNaN(date) && !isNaN(parsedDate)) ? true : false;
  } */

  updateFilter(result) {
    this.updateDialogFilter(result);  //update model with dialog input
    this.applyDialogFilter(this.dialogFilters);

  }

  clearFilter() {
    this.filter.nativeElement.value = '';
    this.data.filter = [new dialogFilterProvider('', 'ALL', '')];
  }

  clearDialogFilter() {
    this.dialogFilters = [];
    this.data.filter = [new dialogFilterProvider('', 'ALL', '')];
    setTimeout(() => {
      this.filter.nativeElement.focus();
    }, 10);

  }

  showDialog(column): void {
    var rect = (<Element>event.target).getBoundingClientRect();
    var dialogWidth: number = 330;
    var position: any = { position: 'absolute', top: rect.top + 30 + 'px', left: rect.left - (dialogWidth / 2) + 'px' };  //custom position at clicked place
    this.selectedChipProperty = column;
    if (this.dialogFilters.length === 0) {
      this.clearFilter();
    }
    this.dialogFilter = this.getDialogFilter(this.dialogFilters, column);
    this.dialogRef = this.dialog.open(dialogFilterComponent, {
      width: dialogWidth + 'px',
      position: position,
      backdropClass: 'dialog-backdrop',
      data: { filter: this.dialogFilter, options: this.db.getColumnData(column) }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateFilter(result)
      }
      this.selectedChipProperty = "";
    });
  }

  isFilterApplied(filterArray, column) {
    let flagContinue: boolean = true;
    let itemFound: boolean = false;
    for (let filterItem of filterArray) {
      if (flagContinue) {
        if (filterItem.property === column) {
          itemFound = true;
          flagContinue = false;
        }
      }
    }
    return itemFound;
  }

  getDialogFilter(filterArray, column) {
    let flagContinue: boolean = true;
    let filter: dialogFilterProvider;
    for (let filterItem of filterArray) {
      if (flagContinue) {
        if (filterItem.property === column) {  //date consideration tbd..          
          filter = { ...filterItem };
          flagContinue = false;
        }
      }
    }
    return filter ? filter : new dialogFilterProvider(column, column, '');
  }

  setDialogFilter(filterArray, dialogfilter) {
    let flagContinue: boolean = true;
    let itemFound: boolean = false;
    if (filterArray.length > 0) {
      for (let filterItem of filterArray) {
        if (flagContinue) {
          if (filterItem.property === dialogfilter.property) {  //date consideration tbd..
            filterItem.value = dialogfilter.value;
            itemFound = true;
            flagContinue = false;
          }
        }
      }
      if (!itemFound) {
        this.dialogFilters.push(dialogfilter);
      }
    } else {
      this.dialogFilters.push(dialogfilter);
    }
  }

  updateDialogFilter(result) {
    switch (result.action) {
      case "Apply":
        this.setDialogFilter(this.dialogFilters, result.filter);
        break;
      case "Remove":
        var index: number = this.dialogFilters.findIndex(x => x.property === result.filter.property);
        if (index > -1) {
          this.dialogFilters.splice(index, 1);
        }
        break;
      default:
    }
  }

  applyDialogFilter(dialogFilters) {
    if (dialogFilters && dialogFilters.length > 0) {
      this.data.filter = dialogFilters;
    } else {
      this.clearDialogFilter();
    }
  }

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

  getColumnData(property) {
    //return this.templateData.map ((item) => { return (item[property]) });  //all values
    let options: string[];
    switch (property) {
      case "Date":
        options = Array.from(new Set(this.templateData.map((item) => { return (new Date(item[property]).toDateString().substring(4)) })));  //unique values
        break;
      default:
        options = Array.from(new Set(this.templateData.map((item) => { return (String(item[property])) })));  //unique values
    }
    return options;
  }

  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<contentProvider[]> = new BehaviorSubject<contentProvider[]>([]);
  get data(): contentProvider[] { return this.dataChange.value; }
}

export class localDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject<dialogFilterProvider[]>([new dialogFilterProvider('', 'ALL', '')]);  //initially ALL filter
  get filter(): dialogFilterProvider[] { return this._filterChange.value; }
  set filter(filter: dialogFilterProvider[]) { this._filterChange.next(filter); }

  constructor(private _db: localDatabase, private _sort: MatSort, private _paginator: MatPaginator, private _dtc: dataTableComponent) {
    super();
  }
  /* connect(): Observable<contentProvider[]> {
    return Observable.of(this.data);
  } */

  connect(): Observable<contentProvider[]> {
    const displayDataChanges = [
      this._db.dataChange,
      this._filterChange,
      this._sort.sortChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      //apply filter
      const filteredData = this.getFilteredData(this._db.data).slice();

      //sort data
      const sortedData = this.getSortedData(filteredData).slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return sortedData.splice(startIndex, this._paginator.pageSize);
    });
  }

  //filter function
  getFilteredData(dbdata): contentProvider[] {
    return dbdata.slice().filter((item: contentProvider) => {
      if (this.filter && this.filter.length > 0 && this.filter[0].property === "ALL") {
        return this.getGlobalFilterData(item, this.filter);
      } else {
        return this.getColumnFilteredData(item, this.filter);
      }
    });
  }

  getGlobalFilterData(item, filterArray) {
    let searchStr: string = "";
    Object.keys(item).forEach((key) => {
      switch (key) {
        case "Date":
          searchStr += new Date(item[key]).toDateString();
          break;
        default:
          searchStr += item[key];
      }
    });
    return searchStr.toLowerCase().indexOf(filterArray[0].value.toLowerCase()) != -1;
  }

  getColumnFilteredData(item, filterArray) {
    let flagFound: boolean = false;
    let flagContinue: boolean = true;
    let itemContent: string;
    for (let filter of filterArray) {
      if (flagContinue) {
        switch (filter.property) {
          case "Date":
            itemContent = new Date(item[filter.property]).toDateString().toLowerCase();
            break;
          default:
            itemContent = String(item[filter.property]).toLowerCase();
        }
        if (itemContent.indexOf(filter.value.toLowerCase()) !== -1) {
          flagFound = true;
        } else {
          flagFound = false;
          flagContinue = false;
        }
      }
    }
    return flagFound;
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(dbdata): contentProvider[] { 
    const data = dbdata.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      /* switch (this._sort.active) {
       case 'userId': [propertyA, propertyB] = [a.id, b.id]; break;
       case 'userName': [propertyA, propertyB] = [a.name, b.name]; break;
       case 'progress': [propertyA, propertyB] = [a.progress, b.progress]; break;
       case 'color': [propertyA, propertyB] = [a.color, b.color]; break;
     }  */
    //  [propertyA, propertyB] = [a[this._sort.active], b[this._sort.active]];
    [propertyA, propertyB] = [a[this._dtc.getMapKey(this._sort.active)], b[this._dtc.getMapKey(this._sort.active)]];
    

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }

  disconnect() { }
}