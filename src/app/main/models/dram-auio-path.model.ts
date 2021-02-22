export interface IAudioFiles {
  folder: string;
  keyPad: number;
  files: IAudioFilesNameCount[];
}

export interface IAudioFilesNameCount {
  name: string;
  count: number;
}

export interface IAudioGeneratedPath {
  [key: number]: IAudioPath[];
}

export interface IAudioPath {
  name: string;
  path: string;
}
