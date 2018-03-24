import { InjectionToken, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DemoSimpleChainComponent } from './demo-simple-chain/demo-simple-chain.component';
import { RouterModule } from '@angular/router';
import { DemoMainPageComponent } from './demo-main-page/demo-main-page.component';
import { FullChainResolver } from '../lib/private/full-chain-resolver';
import { ChainableResolverFactory } from '../lib/chainable-resolver-factory';
import { RandomNumberResolver } from './demo-simple-chain/random-number-resolver';
import { NumberRepeaterResolver } from './demo-simple-chain/number-repeater-resolver';
import { NumberOpposerResolver } from './demo-simple-chain/number-opposer-resolver';

export function chainFactory(injector: Injector): FullChainResolver<{random: number, repeatedNumber: string, opposed: number}> {
  return ChainableResolverFactory
    .createChain()
    .followedBy(RandomNumberResolver, { }, 'random')
    .followedBy(NumberRepeaterResolver, { number: 'random' }, 'repeatedNumber')
    .followedBy(NumberOpposerResolver, { numberToOppose: 'random' }, 'opposed')
    .generateResolver(injector)
    .build();
}

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
      useFactory: chainFactory,
      deps: [Injector]
    }
  ],
  declarations: [DemoSimpleChainComponent, DemoMainPageComponent],
  bootstrap: [DemoMainPageComponent]
})
export class DemoModule { }
