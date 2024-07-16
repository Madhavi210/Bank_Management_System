import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../../core/interface/user.interface';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(users: IUser[], searchTerm: string): IUser[] {
    if (!users || !searchTerm) {
      return users;
    }
    searchTerm = searchTerm.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm)
    );
  }
}
