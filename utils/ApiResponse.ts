export default class ApiResponse {
    public successMessage?: string;
    public errorMessage?: string;
    public valid: boolean;
    public result?: any;
  
    constructor(valid: boolean, result?: any, successMessage?: string, errorMessage?: string) {
      this.valid = valid;
      this.result = result;
      this.successMessage = successMessage;
      this.errorMessage = errorMessage;
    }
  
    public static success(result: any, successMessage: string="Success"): ApiResponse {
      return new ApiResponse(true, result, successMessage);
    }
  
    public static error(errorMessage: string, result?: any): ApiResponse {
      return new ApiResponse(false, result, undefined, errorMessage);
    }
  }