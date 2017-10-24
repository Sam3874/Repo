import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appMaterialModule } from './material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { autofocusDirective } from '../common/directives/directive.autofocus';
import { messageService } from '../common/services/message.service/message.service';
import { appTranslateModule } from '../common/factories/httpLoader.factory';
import { AuthenticationService } from '../common/services/authentication.service/authentication.service';
import { UserService } from '../common/services/user.service';

// used to create fake backend
import { fakeBackendProvider } from '../common/factories/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { homeComponent } from '../home/home.component';
import { dynamicTableComponent } from '../dynamicTable/dynamicTable.component';
import { dialogComponent } from "../dynamicTable/dialog.component/dialog.component"
import { dynamicTableMultilingualComponent } from '../dynamicTable.multilingual/dynamicTable.component';
import { dialogMultilingualComponent } from "../dynamicTable.multilingual/dialog.component/dialog.component";
import { globalFilterComponent } from "../globalFilter/globalFilter.component";
import { columnFilterComponent } from "../columnFilter/columnFilter.component";
import { datagridComponent } from "../common/components/datagrid/datagrid.component";
import { dialogFilterComponent } from "../common/components/datagrid/dialog.component/dialog.component"
import { pageNotFoundComponent } from '../pageNotFound/pageNotFound.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthGuard } from '../common/guards/auth.guard';    
import { routing } from '../router/router.component';
import { appComponent } from '../appComponent/app.component';

@NgModule({
    imports: [
        BrowserModule, 
        BrowserAnimationsModule, 
        FormsModule, 
        HttpModule, 
        HttpClientModule,
        appMaterialModule, 
        ReactiveFormsModule, 
        routing, 
        appTranslateModule,
        FlexLayoutModule
    ],
    declarations: [
        autofocusDirective, 
        appComponent, 
        homeComponent, 
        dynamicTableComponent, 
        dialogComponent, 
        dynamicTableMultilingualComponent, 
        dialogMultilingualComponent,
        globalFilterComponent, 
        columnFilterComponent,
        datagridComponent,
        dialogFilterComponent,
        pageNotFoundComponent,
        LoginComponent,
        RegisterComponent        
    ],
    entryComponents: [
        appComponent, 
        homeComponent, 
        dynamicTableComponent, 
        dialogComponent, 
        dynamicTableMultilingualComponent, 
        dialogMultilingualComponent,
        globalFilterComponent, 
        columnFilterComponent,
        datagridComponent,
        dialogFilterComponent,
        pageNotFoundComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        MockBackend,
        BaseRequestOptions,
        fakeBackendProvider,
        AuthGuard,
        messageService,
        AuthenticationService,
        UserService
    ],
    bootstrap: [
        appComponent
    ]
})
export class AppModule { }