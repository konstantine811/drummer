import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '@root/app/shared/shared.module';
// components
import { MainComponent } from './main/main.component';
import { DramControllerComponent } from './components/dram-controller/dram-controller.component';

@NgModule({
  declarations: [MainComponent, DramControllerComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  entryComponents: [MainComponent]
})
export class MainModule { }
