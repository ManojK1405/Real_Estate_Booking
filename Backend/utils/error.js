export const errorHandler = (err, req, res, next) => {
    const error = new Error();
    error.statuscode = err.statuscode || 500;   
    error.message = err.message || "Internal Server Error";
    return error;
};

