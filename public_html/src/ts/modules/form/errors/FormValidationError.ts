export default

class FormValidationError extends Error {
    constructor(message: string, public field?: string) {
        super(message);
        this.name = "FormValidationError";

        Object.setPrototypeOf(this, FormValidationError.prototype);
    }
}