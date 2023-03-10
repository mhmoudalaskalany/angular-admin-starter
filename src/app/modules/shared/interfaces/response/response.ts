enum HttpStatus {
    Ok = 200,
    Created = 201,
    NoContent = 202,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: HttpStatus;
}
