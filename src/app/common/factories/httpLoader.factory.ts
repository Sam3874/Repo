import { ModuleWithProviders } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient, part: string) {    
    return new TranslateHttpLoader(http, "./assets/translations/", part || "/labels.common.json");        
}

export const appTranslateModule: ModuleWithProviders = TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    });

