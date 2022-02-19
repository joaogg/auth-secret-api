class AppError {
    public readonly message: string;
    public readonly status: number;
    public readonly result: any;

    constructor(message: string, status: number, result: any) {
        this.message = message;
        this.status = status;

        if (result.length > 0) {
            this.result = result;
        }
    }
}

export default AppError;