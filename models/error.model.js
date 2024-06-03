const ErrorClass = class Error {
    constructor(id, code, timestamp, message, severity, details) {
        this.id = id;
        this.code = code;
        this.timestamp = timestamp;
        this.message = message;
        this.severity = severity;
        this.details = details;
    }
    
    get formattedError() {
        return `Error ID: ${this.id}\nCode: ${this.code}\nTimestamp: ${this.timestamp}\nMessage: ${this.message}\nSeverity: ${this.severity}\nDetails: ${this.details}`;
    }
};

ErrorClass.prototype.toString = function() {
    return this.formattedError;
}

module.exports = ErrorClass;