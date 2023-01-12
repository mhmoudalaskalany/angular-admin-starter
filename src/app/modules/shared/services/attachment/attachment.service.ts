import { Injectable } from '@angular/core';
import { HttpService } from 'app/modules/core/services/http/http.service';
import { Attachment } from '../../interfaces/attachment/attachment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService extends HttpService {

  get baseUrl(): string {
    return 'Files/';
  }

  upload(body: FormData, isPublic: boolean) {
    const appCode = 'Pos';
    const APIName = `UploadToSanStorage?storageType=2&isPublic=${isPublic}&appCode=${appCode}`;

    return this.post<Attachment[]>({ APIName, body });
  }

  deleteAttachment(fileId: string) {
    return this.get<boolean>({ APIName: `Delete/${fileId}` });
  }
}
