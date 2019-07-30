import { Pipe, PipeTransform } from '@angular/core';

import { StorageService } from 'src/app/services/storage/storage.service';

import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})

export class ImagePipe implements PipeTransform {

  constructor(
    private storageService: StorageService
  ) {}

  transform( image: any, token: string, type: string = 'users' ): any {
    if ( image === undefined ) {
      return `${ environment.restApiHost }/images/${ type }/noimage?token=${ token }`;
    }

    if ( type === 'users' && this.storageService.isGoogleUser() ) {
      return image;
    }

    return `${ environment.restApiHost }/images/${ type }/${ image }?token=${ token }`;
  }

}
