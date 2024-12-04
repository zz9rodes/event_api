export default class ApiResponse {
    public successMessage?: string;
    public errorMessage?: string;
    public valid: boolean;
    public result?: any;
    public status:number;
  
    constructor(status:number,valid: boolean, result?: any, successMessage?: string, errorMessage?: string) {
      this.valid = valid;
      this.result = result;
      this.successMessage = successMessage;
      this.errorMessage = errorMessage;
      this.status=status
    }
  
    public static success(status:number=200,result: any, successMessage: string="Success"): ApiResponse {
      return new ApiResponse(status,true, result, successMessage);
    }
  
    public static error(status:number=500,errorMessage: string, result?: any): ApiResponse {
      return new ApiResponse(status,false, result, undefined, errorMessage);
    }
  }