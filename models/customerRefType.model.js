const CustomerRefTypeClass = class CustomerRefType {
    constructor(id, href, name, description) {
        this.id = id;
        this.href = href;
        this.name = name;
        this.description = description;
    }
    
    get formattedCustomerRef() {
        return `${this.id}, ${this.name}`;
    }
};

CustomerRefTypeClass.prototype.toString = function() {
    return this.formattedCustomerRef;
}

module.exports = CustomerRefTypeClass;