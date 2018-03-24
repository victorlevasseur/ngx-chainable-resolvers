import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { DemoModule } from './app/demo/demo.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(DemoModule)
  .catch(err => console.log(err));
