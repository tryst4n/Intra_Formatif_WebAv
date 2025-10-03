import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';

export const catloverGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  if(userService.currentUser?.prefercat == false){
    return createUrlTreeFromSnapshot(route, ["/dog"]);
  }
  return true;
};
