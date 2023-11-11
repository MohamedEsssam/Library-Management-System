export class CustomError extends Error {
  httpCode: number;
  constructor(message: string, httpCode: number, name: string) {
    super(message);
    this.httpCode = httpCode;
    this.name = name;
  }
}
