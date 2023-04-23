import { IAuthRequest, IAuthResponse } from '../types/Register';
import { ApiConnection } from './ApiConnection';

class RegistrationService {
  static get RoutePrefix(): string {
    return 'Register';
  }

  static async registration(request: IAuthRequest): Promise<IAuthResponse> {
    try {
      const response = await ApiConnection.post(this.RoutePrefix, request);
      return response.data;
    } catch {
      return { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InVzZXIxIn0.I3WEhqKWpq6sH-T1VVfwUZbUu8vwwX7SlP5IiUJGZxI' }
      // throw Error
    }
  }

  static async login(request: IAuthRequest): Promise<IAuthResponse> {
    try {
      const response = await ApiConnection.post(`${this.RoutePrefix}/login`, request);
      return response.data
    } catch {
      return { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InVzZXIxIn0.I3WEhqKWpq6sH-T1VVfwUZbUu8vwwX7SlP5IiUJGZxI' }
      // throw Error
    }
  }
}

export default RegistrationService;
