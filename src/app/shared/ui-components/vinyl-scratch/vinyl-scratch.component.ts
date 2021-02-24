import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
// libs
import * as Tone from 'tone';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-vinyl-scratch',
  templateUrl: './vinyl-scratch.component.html',
  styleUrls: ['./vinyl-scratch.component.scss'],
})
export class VinylScratchComponent implements OnInit, AfterViewInit {
  @ViewChild('recordGroup') recordGroupRef!: ElementRef;
  @ViewChild('surfaceGroup') surfaceGroupRef!: ElementRef;
  frequencyBase = 560.0;
  frequencyThreshold = 5.0;
  frequencyStep = 100.0;
  gainOffValue = 0.00001;
  vinylGainValue = 0.2;
  oscillatorGainValue = 0.15;

  currentFrequency = this.frequencyBase;
  scratching = false;
  recordGroupEl!: HTMLBaseElement;
  surfaceGroupEl!: HTMLBaseElement;
  angle = 0;
  rotationStart = 0;
  rotationOffset = 0;
  lastX = 0;
  lastY = 0;
  size = 512;
  speedBase = 1;

  delay!: DelayNode;
  audioSource!: AudioBufferSourceNode;
  context!: AudioContext;
  oscillator!: OscillatorNode;
  vinylGain!: GainNode;
  oscillatorGain!: GainNode;
  player!: Tone.Player;
  prevAngle!: number;
  vinylSource!: AudioBufferSourceNode;

  constructor(private http: HttpClient) {}

  rotateRecord = (timestamp: number): void => {
    if (!this.scratching) {
      if (timestamp >= 0) {
        if (this.rotationStart < 0) {
          this.rotationStart = timestamp;
        }
        this.angle =
          (((timestamp - this.rotationStart) / 5.0) % 360.0) +
          this.rotationOffset;
        this.recordGroupEl.setAttribute(
          'transform',
          `rotate(${this.angle}, 256, 256)`
        );
        this.surfaceGroupEl.setAttribute(
          'transform',
          `rotate(${this.angle}, 256, 256)`
        );
      }
    }
    if (this.scratching) {
      if (!this.prevAngle && this.prevAngle !== this.angle) {
      } else if (this.angle === this.prevAngle) {
        this.audioSource.playbackRate.value = 0;
        this.vinylSource.playbackRate.value = 0;
      }
      this.prevAngle = this.angle;
    }
    requestAnimationFrame(this.rotateRecord);
  };

  @HostListener('window:keyup', ['$event'])
  onKeyupHandler(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
        console.log('this');
        this.scratching = true;
        break;
    }
  }

  onMouseUp(): void {
    this.oscillatorGain.gain.cancelScheduledValues(this.context.currentTime);
    this.oscillatorGain.gain.value = this.gainOffValue;
    this.vinylGain.gain.value = this.vinylGainValue;
    this.scratching = false;
    this.audioSource.playbackRate.value = 1;
    this.vinylSource.playbackRate.value = 1;
    this.rotationOffset = this.angle;
    this.rotationStart = -1;
    this.rotateRecord(-1);
  }

  onMouseDown(ev: MouseEvent | PointerEvent): void {
    this.vinylGain.gain.value = this.gainOffValue;
    this.scratching = true;
    this.lastX = ev.offsetX;
    this.lastY = ev.offsetY;
  }

  onMousveMove(ev: MouseEvent | PointerEvent): void {
    if (this.scratching) {
      this.oscillatorGain.gain.cancelScheduledValues(this.context.currentTime);
      const deltaX = ev.offsetX - this.lastX;
      const deltaY = ev.offsetY - this.lastY;

      let rotation = 0;
      let frequency = this.frequencyBase;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        const direction = ev.offsetX > this.size / 2.0 ? -1.0 : 1.0;
        rotation = (deltaX / this.size) * 180.0 * direction;
        frequency +=
          (Math.abs(deltaX) - this.frequencyThreshold) * this.frequencyStep;
      } else {
        const direction = ev.offsetX > this.size / 2.0 ? 1.0 : -0.5;
        rotation = (deltaY / this.size) * 180.0 * direction;
        frequency +=
          (Math.abs(deltaY) - this.frequencyThreshold) * this.frequencyStep;
        /*  this.audioSource.playbackRate.value = Math.abs(
          this.normilize(rotation, 1, 0.)
        ); */
      }
      this.oscillator.frequency.exponentialRampToValueAtTime(
        frequency,
        this.context.currentTime + 0.02
      );
      this.oscillatorGain.gain.value = this.oscillatorGainValue;
      this.angle += rotation;

      this.recordGroupEl.setAttribute(
        'transform',
        `rotate(${this.angle}, 256, 256)`
      );
      this.surfaceGroupEl.setAttribute(
        'transform',
        `rotate(${this.angle}, 256, 256)`
      );
      this.oscillatorGain.gain.setValueAtTime(
        this.gainOffValue,
        this.context.currentTime + 0.6
      );
      this.lastX = ev.offsetX;
      this.lastY = ev.offsetY;
    }
  }

  normilize(val: number, max: number, min: number): number {
    return (val - min) / (max - min);
  }

  createAudioCtx(): void {
    this.context = new AudioContext();
    // setup 2-chanel audio for simulated vinul "silence"
    const numChannels = 2;
    // set frame count to equivalent of one rotation at 33rpm
    const frameCount = this.context.sampleRate * 1.8;
    // audio data buffer
    const dataBuffer = this.context.createBuffer(
      numChannels,
      frameCount,
      this.context.sampleRate
    );
    // create audio data: channel 0 - white noise, channel 1 - pops;
    const channelData0 = dataBuffer.getChannelData(0);
    const channelData1 = dataBuffer.getChannelData(1);
    const popCount = 0; // only used for chanel 1
    for (let i = 0; i < frameCount; i++) {
      const rVal = Math.random() * 0.005 - 0.0025;
      channelData0[i] = i < frameCount / 2.0 ? rVal * 0.8 : rVal;
      channelData1[i] =
        popCount < 3 && Math.abs(rVal) > 0.0249975
          ? rVal < 0
            ? -0.9
            : 0.9
          : 0.0;
    }
    // create AudioBufferSourceNode and set data buffer
    this.vinylSource = this.context.createBufferSource();
    this.vinylSource.buffer = dataBuffer;
    // create gain for vinyl audio and connect
    this.vinylGain = this.context.createGain();
    this.vinylGain.gain.value = this.vinylGainValue;
    this.vinylSource.connect(this.context.destination);
    this.vinylSource.loop = true;
    this.vinylSource.start();
    // setup oscillator sor "scratching" sounds
    this.oscillator = this.context.createOscillator();
    this.oscillator.frequency.value = this.frequencyBase;
    this.oscillator.type = 'sine';

    this.oscillatorGain = this.context.createGain();
    this.oscillatorGain.gain.value = this.gainOffValue;
    this.oscillator.connect(this.oscillatorGain);
    this.oscillatorGain.connect(this.context.destination);
    this.oscillator.start();
  }

  async createAudio(): Promise<void> {
    const url = './assets/soundtraks/samurai.mp3';
    this.http
      .get(url, {
        responseType: 'arraybuffer',
      })
      .subscribe(async (res) => {
        const audioBuffer = await this.context.decodeAudioData(res);
        this.audioSource = this.context.createBufferSource();
        this.delay = this.context.createDelay(5.0);
        this.audioSource.buffer = audioBuffer;
        this.audioSource.loop = true;
        this.audioSource.connect(this.context.destination);
        this.context.resume();
        this.audioSource.start();
      });
  }

  @HostListener('document:visibilitychange', ['$event'])
  async onWindowHidden(): Promise<void> {
    const hidden = document.hidden;
    if (!hidden) {
      this.context.resume();
    } else {
      console.log('hide');
      this.context.suspend();
    }
  }

  ngOnInit(): void {
    this.createAudioCtx();
    this.createAudio();
  }

  ngAfterViewInit(): void {
    this.recordGroupEl = this.recordGroupRef.nativeElement;
    this.surfaceGroupEl = this.surfaceGroupRef.nativeElement;
    this.rotateRecord(0);
  }
}
