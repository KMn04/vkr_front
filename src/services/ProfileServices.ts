import { IUserItem } from '../stores/usersStore';
import { IProjectTask } from '../types/Projects';
import { ITicket } from '../types/Ticket';
import { ApiConnection } from './ApiConnection';

class ProfileServices {
  static get RoutePrefix(): string {
    return 'profile';
  }

  static async getAllUsers(): Promise<IUserItem[]> {
    const response = await ApiConnection.get(this.RoutePrefix + '/allUsers');
    return response.data
  }

}

export default ProfileServices;
