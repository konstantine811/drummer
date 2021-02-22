import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// components
import { DrumSelectMenuComponent } from './ui-components/drum-select-menu/drum-select-menu.component';
import { VinylScratchComponent } from './ui-components/vinyl-scratch/vinyl-scratch.component';

@NgModule({
  declarations: [DrumSelectMenuComponent, VinylScratchComponent],
  imports: [
    CommonModule
  ],
  exports: [DrumSelectMenuComponent, VinylScratchComponent]
})
export class SharedModule { }
