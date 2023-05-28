import { IAuthRequest, IAuthResponse, ILoginRequest } from '../types/Register';
import { ApiConnection } from './ApiConnection';

class RegistrationService {
  static get RoutePrefix(): string {
    return 'register';
  }

  static async registration(request: IAuthRequest): Promise<IAuthResponse> {
    const response = await ApiConnection.post(this.RoutePrefix, request);
    return response.data;
  }

  static async login(request: ILoginRequest): Promise<IAuthResponse> {
    const response = await ApiConnection.post(`/login`, request);
    return response.data
  }
}

export default RegistrationService;
