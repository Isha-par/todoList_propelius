
class ApiError extends Error {
    public statusCode: number;
    public data: any | null;
    public success: boolean;
    public errors: any[];
    // public stack?: string;
  
    constructor(
      statusCode: number,
      message: string = "Something went wrong",
      errors: any[] = [],
      // stack: string = ""
    ) {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.success = false;
      this.errors = errors;

    }
  }
  
  export { ApiError };
  