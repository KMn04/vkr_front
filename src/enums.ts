/** Enum для статуса */
enum Status {
  /** Статус ошибки */
  Error,
  /** Статус нормального состояния */
  Success,
  /** Статус загрузки */
  Fetching,
  /** Базовый статус */
  Initial,
}

export default Status;