import { Component, HostListener, OnInit } from '@angular/core';
// services
import { AudioLoadersService } from '@main/services/audio-loaders/audio-loaders.service';
// config
import { audioFiles, defaultPath } from '@main/config/dram-audio-path';
// model
import {
  IAudioGeneratedPath,
  IAudioPath,
} from '@main/models/dram-auio-path.model';
@Component({
  selector: 'app-dram-controller',
  templateUrl: './dram-controller.component.html',
  styleUrls: ['./dram-controller.component.scss'],
})
export class DramControllerComponent implements OnInit {
  activeBtn!: number | null;
  audioDataPath!: IAudioGeneratedPath;
  currentAudioPaths: HTMLAudioElement[] = [];
  btnPressed = [
    { status: false },
    { status: false },
    { status: false },
    { status: false },
    { status: false },
    { status: false },
    { status: false },
    { status: false },
    { status: false },
    { status: false },
  ];

  constructor(private audioLoaders: AudioLoadersService) {
    this.loadAudio();
  }

  loadAudio(): void {
    this.audioDataPath = this.audioLoaders.generateAudioNames(
      audioFiles,
      defaultPath
    );
  }

  onBtnClick(index: number): void {
    console.log(index);
  }

  @HostListener('window:keydown', ['$event'])
  hadleKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Numpad1':
        this.btnPressed[1].status = true;
        this.playAudio(1);
        break;
      case 'Numpad2':
        this.btnPressed[2].status = true;
        this.playAudio(2);
        break;
      case 'Numpad3':
        this.btnPressed[3].status = true;
        this.playAudio(3);
        break;
      case 'Numpad4':
        this.btnPressed[4].status = true;
        this.playAudio(4);
        break;
      case 'Numpad5':
        this.btnPressed[5].status = true;
        this.playAudio(5);
        break;
      case 'Numpad6':
        this.btnPressed[6].status = true;
        this.playAudio(6);
        break;
      case 'Numpad7':
        this.btnPressed[7].status = true;
        this.playAudio(7);
        break;
      case 'Numpad8':
        this.btnPressed[8].status = true;
        this.playAudio(8);
        break;
      case 'Numpad9':
        this.btnPressed[9].status = true;
        this.playAudio(9);
        break;
    }
  }

  async playAudio(keyPad: number): Promise<void> {
    const audio = this.currentAudioPaths[keyPad];
    if (audio) {
      audio.currentTime = 0;
      await audio.play();
    }
  }

  @HostListener('window:keyup', ['$event'])
  hadleKeyUp(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Numpad1':
        this.btnPressed[1].status = false;
        break;
      case 'Numpad2':
        this.btnPressed[2].status = false;
        break;
      case 'Numpad3':
        this.btnPressed[3].status = false;
        break;
      case 'Numpad4':
        this.btnPressed[4].status = false;
        break;
      case 'Numpad5':
        this.btnPressed[5].status = false;
        break;
      case 'Numpad6':
        this.btnPressed[6].status = false;
        break;
      case 'Numpad7':
        this.btnPressed[7].status = false;
        break;
      case 'Numpad8':
        this.btnPressed[8].status = false;
        break;
      case 'Numpad9':
        this.btnPressed[9].status = false;
        break;
    }
  }

  onSelectedAudio(data: IAudioPath, keyPad: number): void {
    this.currentAudioPaths[keyPad] = new Audio(data.path);
  }

  ngOnInit(): void {}
}
