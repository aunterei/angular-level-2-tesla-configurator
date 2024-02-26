export class CarConfiguratorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CarConfiguratorError';
  }
}
