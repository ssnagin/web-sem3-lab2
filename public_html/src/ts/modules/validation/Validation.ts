export default

abstract class Validator{

    constructor() {}

    static validate(data: any): void {
        throw new Error("Method validate() must be implemented in derived class");
    }
}