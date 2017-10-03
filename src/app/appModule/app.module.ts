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

import { homeComponent } from '../home/home.component';
import { dynamicTableComponent } from '../dynamicTable/dynamicTable.component';
import { dialogComponent } from "../dynamicTable/dialog.component/dialog.component"
import { dynamicTableMultilingualComponent } from '../dynamicTable.multilingual/dynamicTable.component';
import { dialogMultilingualComponent } from "../dynamicTable.multilingual/dialog.component/dialog.component";
import { dataTableComponent } from "../columnFilter/dataTable.component";
import { dialogFilterComponent } from "../columnFilter/dialog.component/dialog.component"
import { pageNotFoundComponent } from '../pageNotFound/pageNotFound.component';
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
        dataTableComponent,
        dialogFilterComponent,
        pageNotFoundComponent
    ],
    entryComponents: [
        appComponent, 
        homeComponent, 
        dynamicTableComponent, 
        dialogComponent, 
        dynamicTableMultilingualComponent, 
        dialogMultilingualComponent, 
        dataTableComponent,
        dialogFilterComponent,
        pageNotFoundComponent
    ],
    providers: [
        messageService
    ],
    bootstrap: [
        appComponent
    ]
})
export class AppModule { }