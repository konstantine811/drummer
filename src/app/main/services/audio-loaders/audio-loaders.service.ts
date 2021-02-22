import { Injectable } from '@angular/core';
// model
import {
  IAudioFiles,
  IAudioGeneratedPath,
} from '@main/models/dram-auio-path.model';
// services
import { ArrayUtilsService } from '@main/services/array-utils/array-utils.service';

@Injectable({
  providedIn: 'root',
})
export class AudioLoadersService {
  constructor(private arrayUtils: ArrayUtilsService) {}

  generateAudioNames(data: IAudioFiles[], path: string): IAudioGeneratedPath {
    const objGeneratedFiles: IAudioGeneratedPath = {};
    data.forEach((item) => {
      const keyPad = item.keyPad;
      const filesP = item.files.map((itemP) => {
        const filesPath = [{ name: itemP.name, path: `${path}${item.folder}/${itemP.name}.wav` }];
        for (let i = 1; i < itemP.count; i++) {
          const name = `${itemP.name} (${i})`;
          filesPath.push({ name, path: `${path}${item.folder}/${name}.wav` });
        }
        return filesPath;
      });
      objGeneratedFiles[keyPad] = this.arrayUtils.flat(filesP);
    });
    return objGeneratedFiles;
  }
}
