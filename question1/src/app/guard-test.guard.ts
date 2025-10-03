import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const guardTestGuard: CanActivateFn = (route, state) => {
 const userService = inject(UserService);
  if (userService.currentUser == null) {
    return createUrlTreeFromSnapshot(route, ["/login"]);
  }
  return true;
};
