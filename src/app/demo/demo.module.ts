import { InjectionToken, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DemoSimpleChainComponent } from './demo-simple-chain/demo-simple-chain.component';
import { RouterModule } from '@angular/router';
import { DemoMainPageComponent } from './demo-main-page/demo-main-page.component';
import { FullChainResolver } from '../lib/private/full-chain-resolver';
import { ChainBuilder } from '../lib/chain-builder';
import { RandomNumberResolver } from './demo-simple-chain/random-number-resolver';
import { NumberRepeaterResolver } from './demo-simple-chain/number-repeater-resolver';
import { NumberOpposerResolver } from './demo-simple-chain/number-opposer-resolver';

export const chainInjectionToken = new InjectionToken('chainInjectionToken');

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: DemoSimpleChainComponent,
        resolve: {
          data: chainInjectionToken
        }
      }
    ])
  ],
  providers: [
    RandomNumberResolver,
    NumberRepeaterResolver,
    NumberOpposerResolver,
    {
      provide: chainInjectionToken,
      useFactory: ChainBuilder
        .create()
        .followedBy(RandomNumberResolver, { }, 'random')
        .followedBy(RandomNumberResolver, {}, 'random2')
        .followedBy(NumberRepeaterResolver, { number: 'random', repeat: 'random2' }, 'repeatedNumber')
        .followedBy(NumberOpposerResolver, { numberToOppose: 'random' }, 'opposed')
        .build(),
      deps: [Injector]
    }
  ],
  declarations: [DemoSimpleChainComponent, DemoMainPageComponent],
  bootstrap: [DemoMainPageComponent]
})
export class DemoModule { }
