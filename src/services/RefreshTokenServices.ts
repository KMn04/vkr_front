import { IAuthRequest, IAuthResponse } from '../types/Register';
import { ApiConnection } from './ApiConnection';

export interface IGetAccessRequest {
  refreshToken: string;
}

export interface IGetAccessResponse {
  token: string
}

class RefreshTokenService {
  static get RoutePrefix(): string {
    return 'refreshToken';
  }

  static async getAccess(request: IGetAccessRequest): Promise<IGetAccessResponse> {
    const response = await ApiConnection.post(this.RoutePrefix, request);
    return response.data;
  }

  static async logout(request: IGetAccessRequest): Promise<void> {
    const response = await ApiConnection.delete(`/login`, { data: request.refreshToken });
    return response.data
  }
}

export default RefreshTokenService;
