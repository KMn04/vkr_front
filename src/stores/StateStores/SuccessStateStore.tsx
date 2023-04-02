import StateBaseStore from './StateBaseStore';
import Status from '../../enums';

/**  класс состояния стора */
class SuccessStateStore extends StateBaseStore {
  constructor() {
    super();
    this.status = Status.Success;
  }
}

export default SuccessStateStore;
