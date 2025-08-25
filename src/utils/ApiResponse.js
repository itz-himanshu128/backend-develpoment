class ApiResponse{
    constructor(statusCode,data,message="Success"){
        this.statusCode=statusCode,
        this.data=data,
        this.message=message,
        this.scccess=statusCode<400 
        // info response (100-199)
        // success response (200-299)
        // redirection message (300- 399)
        // client error message (400-499)
        // server error message (500-599)
    }
}
export { ApiResponse }