import StateBaseStore from './StateBaseStore';
import Status from '../../enums';

/**  класс состояния стора */
class FetchingStateStore extends StateBaseStore {
  constructor() {
    super();
    this.status = Status.Fetching;
  }
}

export default FetchingStateStore;
