import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// models
import { IAudioPath } from '@main/models/dram-auio-path.model';

@Component({
  selector: 'app-drum-select-menu',
  templateUrl: './drum-select-menu.component.html',
  styleUrls: ['./drum-select-menu.component.scss'],
})
export class DrumSelectMenuComponent implements OnInit {
  @Input() option!: IAudioPath[];
  @Output() selectedAudio: EventEmitter<IAudioPath> = new EventEmitter();
  isOpen = false;
  selectedOption!: IAudioPath;
  prevAudioFile!: HTMLAudioElement;

  constructor() {}

  onClickMenu(): void {
    this.isOpen = !this.isOpen;
  }

  onClickItem(option: IAudioPath, index: number): void {
    this.isOpen = false;
    this.option.push(this.selectedOption);
    this.option.splice(index, 1);
    this.selectedOption = option;
    this.selectedAudio.emit(this.selectedOption);
  }

  async onMouseOver(option: IAudioPath): Promise<void> {
    const audioFile = new Audio(option.path);
    await audioFile.play();
    this.prevAudioFile = audioFile;
  }

  onMouseOut(): void {
    if (this.prevAudioFile) {
      this.prevAudioFile.pause();
      this.prevAudioFile.currentTime = 0;
    }
  }

  ngOnInit(): void {
    const selected = this.option.shift();
    if (selected) {
      this.selectedOption = selected;
      this.selectedAudio.emit(selected);
    }
  }
}
