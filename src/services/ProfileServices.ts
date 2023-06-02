import { IUserItem } from '../stores/usersStore';
import { ApiConnection } from './ApiConnection';

export interface IUserProfile {
  userId: number;
  secondName: string;
  firstName: string;
  middleName?: string;
  login: string;
  email: string
}

export interface IUserProfileUpdate {
  userId: number;
  secondName: string;
  firstName: string;
  thirdName?: string;
  login: string;
  email: string;
}

class ProfileServices {
  static get RoutePrefix(): string {
    return 'profile';
  }

  static async getAccount(): Promise<IUserProfile> {
    const response = await ApiConnection.get(this.RoutePrefix + '/');
    return response.data
  }

  static async update(request: Partial<IUserProfileUpdate>): Promise<void> {
    const response = await ApiConnection.put(this.RoutePrefix, request)
  }

  static async deleteUser(): Promise<void> {
    await ApiConnection.delete(this.RoutePrefix)
  }

  static async getAllUsers(): Promise<IUserItem[]> {
    const response = await ApiConnection.get(this.RoutePrefix + '/allUsers');
    return response.data
  }

}

export default ProfileServices;
