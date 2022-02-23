import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrimStringService {
  trim(str: string, length: number): string {
    if (!str)
      return '';
    else if (str.length > length)
      return str.substring(0, length) + '...';
    else
      return str;
  }
}
