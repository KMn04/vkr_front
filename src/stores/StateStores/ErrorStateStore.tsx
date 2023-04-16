import StateBaseStore from './StateBaseStore';
import Status from '../../enums';
import { ServerError } from '../../errors';

/**  класс состояния стора */
class ErrorStateStore extends StateBaseStore {
  constructor(error?: unknown) {
    super();
    this.status = Status.Error;
    this.error = (error as ServerError)?.Message || 'Произошла непредвиденная ошибка';
    this.errorCode = (error as ServerError)?.Status;
  }
}

export default ErrorStateStore;
