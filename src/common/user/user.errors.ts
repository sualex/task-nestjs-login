export class UserNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotFoundError';
    }
}
