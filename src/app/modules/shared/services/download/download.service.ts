import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  download(data: string | Blob, fileName: any = undefined) {
    return saveAs(data, fileName);
  }
}
