import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  getAll() {
    return ['ai', 'typescript', 'js', 'moovie'];
  }
}
