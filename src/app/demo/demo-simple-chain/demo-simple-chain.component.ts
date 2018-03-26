import { Component, OnInit } from '@angular/core';
import { ChainBuilder } from '../../lib/chain-builder';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demo-simple-chain',
  templateUrl: './demo-simple-chain.component.html',
  styleUrls: ['./demo-simple-chain.component.css']
})
export class DemoSimpleChainComponent implements OnInit {

  data: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.data = this.route.snapshot.data.data;
  }

}
