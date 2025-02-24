export interface ApiResponse {
    isOk: boolean;
    data: Record<string, any>, // Data can be an object (with unknown keys) or an error message.
    statusCode: number;
  }
  