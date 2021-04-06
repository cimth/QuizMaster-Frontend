import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseDecoderService {

  private utf8Decoder: TextDecoder = new TextDecoder('utf-8');

  constructor() { }

  decodeArrayBufferResponseToString(response: ArrayBuffer) {
    const responseBytes = new Uint8Array(response);
    return this.utf8Decoder.decode(responseBytes);
  }
}
