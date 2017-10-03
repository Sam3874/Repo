import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { homeComponent } from '../home/home.component';
import { dynamicTableComponent } from '../dynamicTable/dynamicTable.component';
import { dynamicTableMultilingualComponent } from '../dynamicTable.multilingual/dynamicTable.component';
import { dataTableComponent } from "../columnFilter/dataTable.component";
import { pageNotFoundComponent } from '../pageNotFound/pageNotFound.component';

 const appRoutes: Routes = [
    { path: 'home', component: homeComponent },
    { path: 'dynamicTable', component: dynamicTableComponent },
    { path: 'multilingual', component: dynamicTableMultilingualComponent },
    { path: 'columnFilter', component: dataTableComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: pageNotFoundComponent }
]; 

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);