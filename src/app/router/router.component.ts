import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { homeComponent } from '../home/home.component';
import { dynamicTableComponent } from '../dynamicTable/dynamicTable.component';
import { dynamicTableMultilingualComponent } from '../dynamicTable.multilingual/dynamicTable.component';
import { globalFilterComponent } from "../globalFilter/globalFilter.component";
import { columnFilterComponent } from "../columnFilter/columnFilter.component";
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthGuard } from '../common/guards/auth.guard';    
import { pageNotFoundComponent } from '../pageNotFound/pageNotFound.component';

 const appRoutes: Routes = [
    { path: 'home', component: homeComponent, canActivate: [AuthGuard] },
    { path: 'dynamicTable', component: dynamicTableComponent, canActivate: [AuthGuard] },
    { path: 'multilingual', component: dynamicTableMultilingualComponent, canActivate: [AuthGuard] },
    { path: 'globalFilter', component: globalFilterComponent, canActivate: [AuthGuard] },
    { path: 'columnFilter', component: columnFilterComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: pageNotFoundComponent }
]; 

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);