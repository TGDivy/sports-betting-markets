export class APIError extends Error {
  constructor(message: string, status: number, data: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
  status: number;
  data: any;
}
