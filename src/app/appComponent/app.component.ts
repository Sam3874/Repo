import { Component, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
//import { RouteParams} from '@angular/router';
import { MatSidenav } from "@angular/material";
import { listItemProvider } from "./app.listItemProvider";

@Component({
  selector: 'app',
  templateUrl: "./app.template.html",
  encapsulation: ViewEncapsulation.None
})
export class appComponent {
  showFab: boolean;
  listItem: Array<listItemProvider>;    
  ngOnInit() {
    this.translate.setDefaultLang('en');  //fallback language
    this.translate.use('en');  //default langulage        
   }

  constructor(private translate: TranslateService) {    
    this.showFab = window.innerWidth < 400 ? true : false;
    this.listItem = [
      new listItemProvider(1, 'home', '/home', 'Home', 'homeComponent'),
      new listItemProvider(2, 'dynamicTable', '/dynamicTable', '1. Dynamic Table', 'dynamicTableComponent'),
      new listItemProvider(3, 'multilingual', '/multilingual', '2. Multilingual Support', ''),      
      new listItemProvider(4, 'columnFilter', '/columnFilter', '3. Data Table', ''),
      new listItemProvider(5, 'dataList', '/dataList', '4. Nested Data Sets', ''),      
    ];    
//    console.log(RouterStateSnapshot.url);    
  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 500) {
      this.sidenav.close();
      this.showFab = true;
    } else {
      this.sidenav.open();
      this.showFab = false;
    }
  }

}