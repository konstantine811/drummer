import { IAudioFiles } from '@main/models/dram-auio-path.model';

export const defaultPath = './assets/soundtraks/MannieFreshkit/';

const clapAudio: IAudioFiles = {
  folder: 'Clapz',
  keyPad: 3,
  files: [
    {
      name: 'Clap',
      count: 17,
    },
  ],
};

const kickAudio: IAudioFiles = {
  folder: 'Kickz',
  keyPad: 1,
  files: [
    {
      name: 'Kick',
      count: 17,
    },
  ],
};

const loopAudio: IAudioFiles = {
  folder: 'Loopz',
  keyPad: 2,
  files: [
    {
      name: 'Loop',
      count: 4,
    },
    {
      name: 'Sound',
      count: 3,
    },
  ],
};

const percAudio: IAudioFiles = {
  folder: 'Percz',
  keyPad: 4,
  files: [
    {
      name: 'Perc',
      count: 35,
    },
  ],
};

const snaresAudio: IAudioFiles = {
  folder: 'Snarez',
  keyPad: 5,
  files: [
    {
      name: 'Snare',
      count: 39,
    },
  ],
};

export const audioFiles: IAudioFiles[] = [clapAudio, kickAudio, loopAudio, percAudio, snaresAudio]
