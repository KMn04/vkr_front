import { computed, observable } from 'mobx';
import Status from '../../enums';

/** базовый класс состояния стора */
class StateBaseStore {
  /** статус стора */
  @observable status: Status;

  /** ошибка стора */
  @observable error?: string;

  /** Код ошибки */
  @observable errorCode?: number;

  constructor() {
    this.status = Status.Initial;
  }

  /** Статус загрузки */
  @computed get isLoading(): boolean {
    return this.status === Status.Fetching;
  }

  /** стейт в успешном состоянии */
  @computed get isSuccess(): boolean {
    return this.status === Status.Success;
  }

  /** стейт в состоянии ошибки */
  @computed get isError(): boolean {
    return this.status === Status.Error;
  }

  @computed get isInitial(): boolean {
    return this.status === Status.Initial;
  }
}

export default StateBaseStore;
